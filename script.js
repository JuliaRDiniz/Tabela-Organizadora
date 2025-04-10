document.addEventListener("DOMContentLoaded", function () {
  let count = 1;
  let direction = 1;
  const totalSlides = 5;

  document.getElementById("radio1").checked = true;

  setInterval(function () {
    nextImage();
  }, 4000);

  function nextImage() {
    count += direction;

    if (count > totalSlides) {
      direction = -1;
      count = totalSlides - 1;
    } else if (count < 1) {
      direction = 1;
      count = 2;
    }

    document.getElementById("radio" + count).checked = true;
  }

  const savedMonth = localStorage.getItem("month");
  const savedWeek = localStorage.getItem("week");

  if (savedMonth) document.getElementById("month").value = savedMonth;
  if (savedWeek) document.getElementById("week").value = savedWeek;

  document.querySelectorAll("textarea").forEach((textarea) => {
    const id = textarea.id;
    const valorSalvo = localStorage.getItem(id);
    const corBolinha = localStorage.getItem(`cor-${id}`);

    if (valorSalvo !== null) {
      textarea.value = valorSalvo;
      ajustarAltura(textarea);
    }

    const bolinha = textarea.previousElementSibling;
    if (corBolinha && bolinha) {
      bolinha.style.backgroundColor = corBolinha;
    }
  });

  document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.addEventListener("input", function () {
      ajustarAltura(this);
      atualizarBolinha(this);
    });
  });

  document.getElementById("saveTable").addEventListener("click", function () {
    const month = document.getElementById("month").value;
    const week = document.getElementById("week").value;
    localStorage.setItem("month", month);
    localStorage.setItem("week", week);

    document.querySelectorAll("textarea").forEach((textarea) => {
      const id = textarea.id;
      localStorage.setItem(id, textarea.value);

      const bolinha = textarea.previousElementSibling;
      if (bolinha) {
        localStorage.setItem(`cor-${id}`, bolinha.style.backgroundColor);
      }
    });

    alert("Tabela salva com sucesso!");
  });

  document.getElementById("clearTable").addEventListener("click", function () {
    const month = document.getElementById("month");
    const week = document.getElementById("week");

    localStorage.removeItem("month");
    localStorage.removeItem("week");

    // Limpa os campos na tela imediatamente
    month.value = "";
    week.value = "";

    document.querySelectorAll("textarea").forEach((textarea) => {
      const id = textarea.id;
      textarea.value = "";
      ajustarAltura(textarea);
      localStorage.removeItem(id);
      localStorage.removeItem(`cor-${id}`);

      const bolinha = textarea.previousElementSibling;
      if (bolinha) {
        bolinha.style.backgroundColor = "transparent";
      }
    });

    alert("Tabela apagada com sucesso!");
  });

  function ajustarAltura(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  function atualizarBolinha(textarea) {
    const tr = textarea.closest("tr");
    const categoryCell = tr?.querySelector(".category");
    const bolinha = textarea.previousElementSibling;

    if (categoryCell && bolinha) {
      let bgColor = window.getComputedStyle(categoryCell).backgroundColor;
      if (textarea.value.trim() !== "") {
        bolinha.style.backgroundColor = bgColor;
      } else {
        bolinha.style.backgroundColor = "transparent";
      }
    }
  }
});
