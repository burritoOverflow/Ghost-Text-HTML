// rate at which the text is "deghosted"
const DEGHOST_INTERVAL = 75;
// rate at which the text is "typed out"
const TYPEWRITER_INTERVAL = 35;

const container = document.querySelector(".text-container");
const toggleButton = document.getElementById("mode-toggle");
let isTokenMode = true; // true: token mode, false: character mode

const sampleText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi ipsum, finibus ac tortor nec, molestie faucibus nisl. Phasellus ut rhoncus massa, consequat rutrum odio. Quisque orci risus, tristique sit amet ultrices eu, pharetra ullamcorper odio.
Nunc eget venenatis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce ac sem id elit volutpat feugiat ac vel justo. Nulla sit amet leo at tortor eleifend maximus sed id ligula. Sed condimentum mi urna, ut euismod lectus sodales at. Vestibulum eget viverra purus. Curabitur euismod eget tellus at tempus. Pellentesque at ornare elit, eget suscipit libero.
Fusce in eros quam. Nunc id nibh consectetur, rutrum augue non, tempus augue. Nullam non ipsum enim. Vivamus commodo, dolor non commodo dictum, ligula tortor pulvinar risus, quis gravida nisi neque nec mi. Fusce quis dolor ut purus tempus molestie. Curabitur eu scelerisque mi. Sed eget aliquam nulla, eu venenatis erat. Nulla blandit ultricies nunc, quis faucibus lectus imperdiet sit amet. Donec porta varius mauris, eu blandit urna.
Ut accumsan pellentesque facilisis. Quisque tristique est odio. Donec sit amet euismod odio, id placerat sem. Praesent commodo fringilla nisi quis tempus. Mauris sed tincidunt urna, sit amet dignissim arcu. Nullam sed elit purus. Curabitur congue finibus efficitur. Phasellus sagittis, tellus vel lobortis gravida, eros enim dapibus massa, ac facilisis nibh lorem et leo. Curabitur in lacus quis mauris convallis consectetur. Suspendisse potenti. Donec lacus lorem, mollis nec elementum at, vestibulum sit amet leo. Donec posuere massa quis varius porttitor. Maecenas efficitur mollis ipsum. Maecenas elementum tempor augue id porttitor. Praesent a nunc convallis, ullamcorper lacus a, aliquet tortor. Aliquam odio ipsum, ornare in consequat vel, condimentum vitae leo.`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createCursor() {
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  return cursor;
}

function clearText() {
  container.innerHTML = "";
}

async function typewriterEffect() {
  const cursor = createCursor();
  container.appendChild(cursor);

  const units = isTokenMode
    ? sampleText.match(/\S+|\s+/g) // split by token
    : sampleText.split("");

  for (const unit of units) {
    const span = document.createElement("span");
    span.textContent = unit;
    span.className = "text-unit ghost";
    if (!cursor.parentNode) {
      break;
    }
    container.insertBefore(span, cursor);
    await sleep(TYPEWRITER_INTERVAL);
  }

  cursor.remove();
}

async function deghost() {
  const units = container.querySelectorAll(".text-unit");
  for (const unit of units) {
    unit.classList.remove("ghost");
    unit.classList.add("solid");
    await sleep(DEGHOST_INTERVAL);
  }
}

async function animate() {
  clearText();
  await typewriterEffect();
  await deghost();
}

async function toggleMode() {
  isTokenMode = !isTokenMode;
  toggleButton.textContent = `Switch to ${
    isTokenMode ? "Characters" : "Tokens"
  }`;
  animate();
}

// on click clear text and start over in the new mode
toggleButton.addEventListener("click", toggleMode);

animate();
