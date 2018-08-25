module.exports = function (app) {
    build(app)
        .then(result => console.log(result))
        .catch(err => console.log(err));
};

const build = async (app) => {
    const {Category, Report} = app.models;

    const categories = await Category.find();
    if (categories.length === 0) {
        await Category.create([
            {"name": "Asalto", "iconUrl": "/categories/0.png"}, {
                "name": "Robo",
                "iconUrl": "/categories/1.png"
            }, {"name": "Pelea", "iconUrl": "/categories/2.png"}, {
                "name": "Borrachera",
                "iconUrl": "/categories/3.png"
            }, {"name": "Venta de Drogas", "iconUrl": "/categories/4.png"}, {
                "name": "Asesinato",
                "iconUrl": "/categories/5.png"
            }, {"name": "Balacera", "iconUrl": "/categories/6.png"}, {
                "name": "Vandalismo",
                "iconUrl": "/categories/7.png"
            }, {"name": "Manifestación Violenta", "iconUrl": "/categories/8.png"}, {
                "name": "Abuso Policial",
                "iconUrl": "/categories/9.png"
            }, {"name": "Abuso Infantil", "iconUrl": "/categories/10.png"}, {
                "name": "Violencia Escolar",
                "iconUrl": "/categories/11.png"
            }, {"name": "Atropellamiento", "iconUrl": "/categories/12.png"}, {
                "name": "Persona Sospechosa",
                "iconUrl": "/categories/13.png"
            }, {"name": "Posible Ladrón", "iconUrl": "/categories/14.png"}, {
                "name": "Prostitución Ilegal",
                "iconUrl": "/categories/15.png"
            }, {"name": "Violencia Doméstica", "iconUrl": "/categories/16.png"}, {
                "name": "Posible Terrorismo",
                "iconUrl": "/categories/17.png"
            }, {"name": "Pandillas Molestando", "iconUrl": "/categories/18.png"}, {
                "name": "Soborno a Policías",
                "iconUrl": "/categories/19.png"
            }, {"name": "Secuestro Express", "iconUrl": "/categories/20.png"}
        ]);

    }
    const categories2 = await Category.find();
    console.log(categories2);
};
