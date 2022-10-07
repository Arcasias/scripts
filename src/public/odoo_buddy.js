/**
 * Odoo buddy
 *
 * @description Adds options to the Odoo backend login screen to login as admin, user or portal in a single click.
 * @use on any Odoo environment.
 */

if (!window.odoo) {
  return;
}

const { odoo, owl, location } = window;

// Console infos + getters
if (!odoo.__OB_PATCH__) {
  const defineGetterOnce = (obj, prop, get) => {
    if (!Object.getOwnPropertyDescriptor(obj, prop)) {
      Object.defineProperty(obj, prop, { get });
    }
  };

  defineGetterOnce(odoo, "__OB_PATCH__", () => true);

  let session;
  if ("@web/session" in odoo.__DEBUG__.services) {
    session = odoo.__DEBUG__.services["@web/session"].session;
  } else {
    session = odoo.__DEBUG__.services["web.session"];
  }

  defineGetterOnce(odoo, "session", () => session);

  const isFrontend = [...document.head.querySelectorAll("script")].some((s) =>
    /frontend/.test(s.src)
  );

  const CONSOLE_STYLE = {
    title:
      "color:#017e84;font-weight:bold;font-family:Roboto;font-size:1.2rem;margin-bottom:0.2rem;",
    default:
      "color:#aab;font-weight:inherit;font-family:Roboto;font-size:inherit;margin:0;margin-bottom:0.1rem;",
    highlight: "color:#98f;",
  };

  const infos = [`%cOdoo ${isFrontend ? "frontend" : "backend"} environment%c`];

  if (session.db) {
    const serverVersion = session.server_version || "";
    const servEnv = serverVersion
      ? ` (${serverVersion.endsWith("e") ? "enterprise" : "community"})`
      : "";
    infos.push(
      `• Database : %c${session.db + servEnv}%c`,
      `• Server version : %c${serverVersion}%c`
    );
  }

  if (owl) {
    const getComponents = ({ component, children }) => ({
      [component.constructor.name]: component,
      children: Object.values(children).map(getComponents),
    });
    defineGetterOnce(owl, "root", () => {
      if (!odoo.__WOWL_DEBUG__) {
        throw new Error("Root not instantiated yet.");
      }
      return getComponents(odoo.__WOWL_DEBUG__.root.__owl__);
    });
    infos.push(`• Owl version : %c${owl.__info__.version}%c`);
  }

  if (odoo.debug) {
    infos.push(`• Debug mode : %c${odoo.debug}%c`);
  }

  const debugArgs = [
    infos.join("\n"),
    CONSOLE_STYLE.title,
    CONSOLE_STYLE.default,
  ];
  for (let i = 1; i < infos.length; i++) {
    debugArgs.push(CONSOLE_STYLE.highlight, CONSOLE_STYLE.default);
  }

  console.debug(...debugArgs);
}

// Login page
if (
  location.pathname === "/web/login" &&
  !/(www|runbot)\.odoo\.com/.test(location.hostname)
) {
  const onWindowClick = (ev) => {
    setOpen(Boolean(ev.target.closest("#ob-toggle")));
  };

  const render = () => {
    btnContainer.innerHTML = renderTemplate();
    while (renderFinalizers.length) {
      renderFinalizers.pop()();
    }
  };

  const renderTemplate = () => /* xml */ `
    <button class="btn btn-primary ms-2 me-2" style="flex:1" ${submitHandler()}>
      Log in
    </button>
    <div class="btn-group" style="flex:2.5">
      <button class="btn btn-primary" ${submitHandler(state.user)}>
        Log in as ${state.user}
      </button>
      <button id="ob-toggle" type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" />
      ${
        state.open
          ? /* xml */ `
      <ul class="dropdown-menu show">
        <li class="dropdown-item" ${submitHandler("admin")}>
          <span>Admin</span>
        </li>
        <li class="dropdown-item" ${submitHandler("demo")}>
          <span>Demo</span>
        </li>
        <li class="dropdown-item" ${submitHandler("portal")}>
          <span>Portal</span>
        </li>
      </ul>
      `
          : ""
      }
    </div>`;

  const setOpen = (open) => {
    if (open !== state.open) {
      state.open = open;
      render();
    }
  };

  const setUser = (user) => {
    if (user !== state.user) {
      state.user = user;
      window.localStorage.setItem(STORAGE_KEY, user);
      render();
    }
    loginInput.value = pwdInput.value = user;
  };

  const submitHandler = (user) => {
    const attr = `${TRACKER_ATTRIBUTE}="${nextId++}"`;
    renderFinalizers.push(() => {
      const target = btnContainer.querySelector(`[${attr}]`);
      target.removeAttribute(TRACKER_ATTRIBUTE);
      target.addEventListener("click", () => {
        if (user) {
          setUser(user);
        }
        form.submit();
      });
    });
    return attr;
  };

  customElements.define(
    "ob-buttons",
    class OdooBuddyButtons extends HTMLElement {
      connectedCallback() {
        window.addEventListener("click", onWindowClick, true);
      }

      disconnectedCallback() {
        window.removeEventListener("click", onWindowClick, true);
      }
    }
  );

  const STORAGE_KEY = "odoo-buddy-user";
  const TRACKER_ATTRIBUTE = "data-ob-key";
  const loginButtons = document.querySelector(".oe_login_buttons ");
  const btnContainer = new (customElements.get("ob-buttons"))();
  btnContainer.setAttribute("class", "d-flex");

  const loginInput = document.querySelector("input[name=login]");
  loginInput.value = "";
  const pwdInput = document.querySelector("input[name=password]");
  pwdInput.value = "";
  const form = loginInput.closest("form");
  for (const el of [loginInput, pwdInput, form]) {
    el.setAttribute("autocomplete", "off");
  }

  const renderFinalizers = [];
  const state = {
    open: false,
    user: window.localStorage.getItem(STORAGE_KEY),
  };
  let nextId = 1;

  if (state.user) {
    render();
  } else {
    setUser("admin");
  }

  loginButtons.children[0].remove();
  loginButtons.prepend(btnContainer);
}
