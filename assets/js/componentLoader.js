document.addEventListener("DOMContentLoaded", async () => {
    const components = [
        { id: "header-container", url: "components/header.html" },
        { id: "hero-container", url: "components/hero.html" },
        { id: "about-container", url: "components/about.html" },
        { id: "skills-container", url: "components/skills.html" },
        { id: "projects-container", url: "components/projects.html" },
        { id: "contact-container", url: "components/contact.html" },
        { id: "footer-container", url: "components/footer.html" },
        { id: "modals-container", url: "components/modals.html" }
    ];

    try {
        // Cargar todos los componentes en paralelo
        const fetchPromises = components.map(async (component) => {
            const response = await fetch(component.url);
            if (!response.ok) throw new Error(`Error cargando ${component.url}`);
            const html = await response.text();
            document.getElementById(component.id).innerHTML = html;
        });

        await Promise.all(fetchPromises);

        // Una vez inyectado todo el HTML, cargamos el script principal (main.js)
        const mainScript = document.createElement("script");
        mainScript.src = "assets/js/main.js";
        document.body.appendChild(mainScript);
    } catch (error) {
        console.error("Error al cargar los componentes:", error);
    }
});
