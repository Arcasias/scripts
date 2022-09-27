import { useEffect, useState } from "react";
import "./Script.scss";
import { scripting, storage, tabs } from "./services";

const getWebsiteHostname = (url) => {
  const a = document.createElement("a");
  a.href = url;
  return a.hostname;
};

const formatText = (text) => {
  const codeBlocks = [];
  const replaced = text.replace(/`([^`]+)`/g, (_, block) => {
    codeBlocks.push(block);
    return "%BLOCK%";
  });
  const parts = replaced.split("%BLOCK%");
  const result = [];
  for (let i = 0; i < parts.length; i++) {
    result.push(parts[i]);
    if (codeBlocks[i]) {
      result.push(<code key={i}>{codeBlocks[i]}</code>);
    }
  }
  return result;
};

const LIST_ITEM_CLASS = "list-group-item bg-dark text-light";

export const Script = ({
  script: {
    directives: { description, result, use, website },
    fileName,
    id,
    title,
    url,
  },
  hovered,
  onHover,
}) => {
  let locked = false;

  const [error, setError] = useState("");
  const [runCount, setRunCount] = useState(0);
  const [autoRunning, setAutorunning] = useState(false);
  const hostName = (website && getWebsiteHostname(website)) || false;

  useEffect(() => {
    const fetchAutorunning = async () => {
      try {
        const value = await storage.sync.get(id);
        setAutorunning(Boolean(value[id]));
      } catch (err) {
        console.debug(err);
        setAutorunning(false);
      }
    };
    fetchAutorunning();
  }, [id]);

  const setAutorun = async (activate) => {
    if (locked) {
      return;
    }
    const previous = autoRunning;
    setAutorunning(activate);
    try {
      if (activate) {
        await storage.sync.set({ [id]: { id, hostName, fileName } });
      } else {
        await storage.sync.remove(id);
      }
    } catch (err) {
      setAutorunning(previous);
      console.debug(err);
    }
    if (runCount === 0) {
      run();
    }
  };

  const run = async () => {
    if (locked) {
      return;
    }
    locked = true;
    try {
      const [tab] = await tabs.query({
        active: true,
        currentWindow: true,
      });
      await scripting.executeScript({
        target: { tabId: tab.id },
        files: [`./src/public/${fileName}`],
      });
      setRunCount(runCount + 1);
    } catch (err) {
      console.debug(err);
      setError(err.message);
    } finally {
      locked = false;
    }
  };

  const getStatusAttr = (prefix) => {
    if (error) {
      return `${prefix}-danger`;
    } else if (autoRunning || runCount > 0) {
      return `${prefix}-success`;
    }
  };

  const getClass = (...classNames) => classNames.filter(Boolean).join(" ");

  return (
    <li
      className={getClass(
        "script card bg-dark text-light mt-2",
        getStatusAttr("border"),
        hovered && "hovered"
      )}
      tabIndex="0"
      onMouseEnter={onHover}
    >
      <div className="card-body">
        <h6
          className={getClass(
            "script-title card-title d-flex align-items-center",
            getStatusAttr("text"),
            !hovered && "m-0"
          )}
        >
          <a href={url} target="_blank" rel="noreferrer" className="text-reset text-decoration-none">
            {title}
          </a>
          <div className="ms-auto btn-group">
            <button
              className={`btn p-0 ps-1 text-${
                runCount > 0 ? "success" : "light"
              }`}
              onClick={run}
              title="Run script"
            >
              <i className="bi bi-play-fill" />
            </button>
            <button
              className={`btn p-0 px-1 text-${
                autoRunning ? "success" : "light"
              }`}
              onClick={() => setAutorun(!autoRunning)}
              title={
                autoRunning ? "Stop autorunning" : "Autorun script at page load"
              }
            >
              <i className="bi bi-arrow-repeat" />
            </button>
          </div>
        </h6>
        {hovered && description && (
          <p className="card-text">{formatText(description)}</p>
        )}
      </div>
      {hovered && (
        <ul className="border-0 list-group list-group-flush">
          {website && (
            <li className={LIST_ITEM_CLASS}>
              Website:{" "}
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                className="card-link"
              >
                {hostName}
              </a>
            </li>
          )}
          {use && <li className={LIST_ITEM_CLASS}>Use: {use}</li>}
        </ul>
      )}
      {hovered && error && (
        <footer className="card-footer d-flex align-items-center justify-content-between">
          <span className="fst-italic text-danger">
            Error: check the console{" "}
          </span>
          <button
            className="btn btn-sm border border-danger text-danger"
            onClick={() => setError("")}
          >
            Dismiss
          </button>
        </footer>
      )}
    </li>
  );
};
