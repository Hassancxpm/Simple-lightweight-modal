// this import statement tells webpack to include styles.css in the build
import css from "./styles.css"

function init() {
  if (!window.addEventListener) return // Check for IE9+

  let options = INSTALL_OPTIONS
  let element

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement() {
    element = INSTALL.createElement(
      { method: "prepend", selector: "body" },
      element,
    )

    // Set the app attribute to your app's dash-delimited alias.
    element.setAttribute("app", "lightPopup")
    element.innerHTML = `<div class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${options.title}</h2>
            <p>${options.message}</p>
            <button class="button button--aylen button--round-l button--text-thick">${options.ButtonTitle}</button>
        </div>
    </div>`

    const poppy = localStorage.getItem("lightPopup")
    const modal = document.querySelector(
      'cloudflare-app[app="lightPopup"] .modal',
    )
    const closeButton = document.querySelector(
      'cloudflare-app[app="lightPopup"] .close-button',
    )
    const confirmationButton = document.querySelector(
      'cloudflare-app[app="lightPopup"] .button',
    )

    function showModal() {
      modal.classList.add("show-modal")
      localStorage.setItem("lightPopup", "true")
    }

    function hideModal() {
      modal.classList.remove("show-modal")
    }

    function showButton() {
      confirmationButton.classList.add("show-button")
    }

    function hideButton() {
      confirmationButton.classList.remove("show-button")
    }

    function validURL(str) {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i",
      ) // fragment locator
      return !!pattern.test(str)
    }

    function redirectTrafficTo() {
      if (options.UrlRedirection && validURL(options.UrlRedirection)) {
        window.location.href = options.UrlRedirection
      } else {
        hideModal()
      }
    }

    closeButton.style.background = options.ModalMainColor
    confirmationButton.style.background = options.ModalMainColor

    closeButton.addEventListener("click", hideModal)

    if (options.ButtonBehaviorRedirect === "true") {
      confirmationButton.addEventListener("click", e => {
        e.preventDefault()
        e.stopImmediatePropagation()
        redirectTrafficTo()
      })
    }

    confirmationButton.addEventListener("click", hideModal)

    if (options.advanced === "true" && !poppy) showModal()

    if (options.advanced === "false") showModal()

    if (options.PopupButton === "true") {
      showButton()
    } else {
      hideButton()
    }
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions

      updateElement()
    },
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElement)
  } else {
    updateElement()
  }
}

init()
