// this import statement tells webpack to include styles.css in the build
import css from "./styles.css"

function init() {
  if (!window.addEventListener) return // Check for IE9+

  let options = INSTALL_OPTIONS
  let element

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement() {
    const poppy = localStorage.getItem("lightPopup")
    const documentLang = document.querySelector("html").getAttribute("lang")
    const hasVisited = sessionStorage.getItem("lightPopup")

    element = INSTALL.createElement(options.location, element)

    function getMaxZIndex() {
      let max = 0
      const elements = document.getElementsByTagName("*")

      Array.prototype.slice.call(elements).forEach(el => {
        const zIndex = parseInt(
          document.defaultView.getComputedStyle(el).zIndex,
          10,
        )

        max = zIndex ? Math.max(max, zIndex) : max
      })

      return max
    }

    element.style.display = "none"
    element.setAttribute("app", "lightPopup")
    element.style.zIndex = getMaxZIndex() + 1
    element.innerHTML = `<div class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <span class="big-title">${
              options.AddFrenchTraduction === "true" && documentLang === "fr"
                ? options.FrenchTitle
                : options.title
            }</span>
            <p>${
              options.AddFrenchTraduction === "true" && documentLang === "fr"
                ? options.FrenchMessage
                : options.message
            }</p>
            <button class="button button--aylen button--round-l button--text-thick">${
              options.AddFrenchTraduction === "true" && documentLang === "fr"
                ? options.FrenchButtonTitle
                : options.ButtonTitle
            }</button>
        </div>
    </div>`

    const modal = document.querySelectorAll(
      'cloudflare-app[app="lightPopup"] .modal',
    )
    const modalContent = document.querySelector(
      'cloudflare-app[app="lightPopup"] .modal-content',
    )
    const closeButton = document.querySelector(
      'cloudflare-app[app="lightPopup"] .close-button',
    )
    const confirmationButton = document.querySelector(
      'cloudflare-app[app="lightPopup"] .button',
    )
    const modalTitle = document.querySelector(
      'cloudflare-app[app="lightPopup"] .big-title',
    )
    const button = document.querySelector(
      'cloudflare-app[app="lightPopup"] button',
    )
    const modalMessage = document.querySelectorAll(
      'cloudflare-app[app="lightPopup"] .modal-content p',
    )
    const isCloudflareDashboard =
      window.location.hostname.indexOf("cloudflare") > -1

    function showModal() {
      element.style.display = "flex"
      modal[0].classList.add("show-modal")
    }

    function hideModal() {
      modal[0].classList.remove("show-modal")
      element.style.display = "none"
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
      if (documentLang === "fr") {
        if (options.UrlRedirectionFR && validURL(options.UrlRedirectionFR)) {
          hideModal()
          window.location.href = options.UrlRedirectionFR
        } else {
          hideModal()
        }
      }
      if (documentLang !== "fr") {
        if (options.UrlRedirectionEN && validURL(options.UrlRedirectionEN)) {
          hideModal()
          window.location.href = options.UrlRedirectionEN
        } else {
          hideModal()
        }
      }
    }

    function handleRedirectOnClick(e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      redirectTrafficTo()
    }

    closeButton.style.background = options.ModalButtonColor

    confirmationButton.style.background = options.ModalButtonColor

    modalTitle.style.color = options.ModalTitleColor

    button.style.color = options.ButtonTextColor

    for (let i = 0; i < modalMessage.length; i += 1) {
      modalMessage[i].style.color = options.ModalMessageColor
    }

    modalContent.style.borderRadius = `${options.radius}px`

    modalContent.style.background = options.ModalBackgroundColor

    confirmationButton.addEventListener("click", hideModal)

    closeButton.addEventListener("click", hideModal)

    if (options.ButtonBehaviorRedirect === "true") {
      confirmationButton.addEventListener("click", handleRedirectOnClick)
    } else {
      confirmationButton.removeEventListener("click", handleRedirectOnClick)
    }

    if (
      (options.ShowOnlyOnce === "onlyOnce" && !poppy) ||
      isCloudflareDashboard
    ) {
      localStorage.setItem("lightPopup", "true")
      showModal()
    }

    if (options.ShowOnlyOnce === "oncePerSession" && !hasVisited) {
      sessionStorage.setItem("lightPopup", "true")
      showModal()
    }

    if (options.ShowOnlyOnce === "false" || isCloudflareDashboard) showModal()

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
