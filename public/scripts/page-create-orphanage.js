//Criar mapa
const map = L.map("mapid").setView([-27.222633, -49.6455874], 15);

//Criar e adicionar tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//Criar ícone
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

//Criar e adicionar marcador
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  //Enviar a posição do ícone no mapa para o backend
  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  //Remover ícone se ele já existir
  marker && map.removeLayer(marker);

  //Adicionar ícone
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

//Adicionar o campo de fotos
function addPhotoField() {
  //Pegar o container de fotos #images
  const container = document.querySelector("#images");

  //Pegar o container para duplicar .new-upload
  const fieldsContainer = document.querySelectorAll(".new-upload");

  //Clonar a última imagem adicionada
  const newFieldContainer =
    fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

  //Verificar se o campo está vazio. Se estiver, não adicionar ao container #images
  const input = newFieldContainer.children[0];

  if (input.value == "") {
    return;
  }

  //Limpar o campo antes de adicionar ao container de #images
  newFieldContainer.children[0].value = "";

  //Adicionar o clone ao container de #images
  container.appendChild(newFieldContainer);
}

//Deletar foto
function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length <= 1) {
    span.parentNode.children[0].value = "";
    return;
  }

  //Deletar todo o campo
  span.parentNode.remove();
}

//Selecionar o button Sim ou Não
function toggleSelect(event) {
  //Remover a class .active dos botões
  document.querySelectorAll(".button-select button").forEach(function (button) {
    button.classList.remove("active");
  });

  //Colocar a class .active no botão clicado
  const button = event.currentTarget;
  button.classList.add("active");

  //Atualizar o input hidden com o valor selecionado
  const input = document.querySelector('[name="open_on_weekends"]');

  input.value = button.dataset.value;
}

