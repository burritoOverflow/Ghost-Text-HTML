const container = document.querySelector(".text-container");
const toggleButton = document.getElementById("mode-toggle");
const TEXT_INTERVAL = 123;
let isTokenMode = true;

const sampleText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi ipsum, finibus ac tortor nec, molestie faucibus nisl. Phasellus ut rhoncus massa, consequat rutrum odio. Quisque orci risus, tristique sit amet ultrices eu, pharetra ullamcorper odio.
Nunc eget venenatis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce ac sem id elit volutpat feugiat ac vel justo. Nulla sit amet leo at tortor eleifend maximus sed id ligula. Sed condimentum mi urna, ut euismod lectus sodales at. Vestibulum eget viverra purus. Curabitur euismod eget tellus at tempus. Pellentesque at ornare elit, eget suscipit libero.
Fusce in eros quam. Nunc id nibh consectetur, rutrum augue non, tempus augue. Nullam non ipsum enim. Vivamus commodo, dolor non commodo dictum, ligula tortor pulvinar risus, quis gravida nisi neque nec mi. Fusce quis dolor ut purus tempus molestie. Curabitur eu scelerisque mi. Sed eget aliquam nulla, eu venenatis erat. Nulla blandit ultricies nunc, quis faucibus lectus imperdiet sit amet. Donec porta varius mauris, eu blandit urna.
Ut accumsan pellentesque facilisis. Quisque tristique est odio. Donec sit amet euismod odio, id placerat sem. Praesent commodo fringilla nisi quis tempus. Mauris sed tincidunt urna, sit amet dignissim arcu. Nullam sed elit purus. Curabitur congue finibus efficitur. Phasellus sagittis, tellus vel lobortis gravida, eros enim dapibus massa, ac facilisis nibh lorem et leo. Curabitur in lacus quis mauris convallis consectetur. Suspendisse potenti. Donec lacus lorem, mollis nec elementum at, vestibulum sit amet leo. Donec posuere massa quis varius porttitor. Maecenas efficitur mollis ipsum. Maecenas elementum tempor augue id porttitor. Praesent a nunc convallis, ullamcorper lacus a, aliquet tortor. Aliquam odio ipsum, ornare in consequat vel, condimentum vitae leo.`;

function clearText() {
  container.innerHTML = "";
}

function initializeText() {
  clearText();
  const units = isTokenMode
    ? sampleText.match(/\S+|\s+/g)
    : sampleText.split("");

  units.forEach((unit) => {
    const span = document.createElement("span");
    span.textContent = unit;
    span.className = "text-unit ghost";
    container.appendChild(span);
  });
}

async function revealText() {
  const units = container.querySelectorAll(".text-unit");

  for (const unit of units) {
    unit.classList.remove("ghost");
    unit.classList.add("solid");
    await new Promise((resolve) => setTimeout(resolve, TEXT_INTERVAL));
  }
}

function toggleMode() {
  isTokenMode = !isTokenMode;
  toggleButton.textContent = `Switch to ${
    isTokenMode ? "Characters" : "Tokens"
  }`;

  clearText();
  initializeText();
  revealText();
}

toggleButton.addEventListener("click", toggleMode);

initializeText();
revealText();
