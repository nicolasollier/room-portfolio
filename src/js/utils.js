export function displayDialogue(text, onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container")
  const dialogue = document.getElementById("dialogue")
  const closeBtn = document.getElementById("close-btn")

  dialogueUI.style.display = "block"

  let i = 0
  let currentText = ""

  const interval = setInterval(() => {
    if (i < text.length) {
      currentText += text[i]
      dialogue.innerHTML = currentText
      i++

      return
    }

    clearInterval(interval)
  }, 5)

  function handleClose() {
    onDisplayEnd()
    dialogueUI.style.display = "none"
    dialogue.innerHTML = ""
    clearInterval(interval)
    closeBtn.removeEventListener("click", handleClose)
  }

  closeBtn.addEventListener("click", handleClose)
}

export function setCamScale(k) {
  const resizeFactor = k.width() / k.height()

  if (resizeFactor > 1) {
    k.camScale(k.vec2(1));
    return
  }

  k.camScale(k.vec2(1.5));
}
