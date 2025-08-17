// --- DATOS DE PRODUCTOS Y GRAFO (SIEMPRE AL PRINCIPIO) ---

// Definir los Costos de Ponderación
const costoRelacion = {
    "compatibilidad_critica": 1,        // El camino ideal: costo casi nulo
    "compatibilidad_rendimiento": 5,    // Costo bajo: buena combinación
    "complementario": 10,               // Costo moderado: son accesorios, no centrales
    "periferico": 15,                   // Costo un poco más alto: son extras
    "alternativa": 100,                 // Costo alto: queremos evitar comprar dos similares
    "excluyente": Infinity              // Infinito: la conexión es imposible
};

const productos = {
    // Tarjetas Gráficas
    "rtx4090": { id: 'rtx4090', nombre: 'NVIDIA GeForce RTX 4090', precio: 1599.00, categoria: 'GPU', img: 'https://via.placeholder.com/150' },
    "rtx4080": { id: 'rtx4080', nombre: 'NVIDIA GeForce RTX 4080', precio: 1199.00, categoria: 'GPU', img: 'https://via.placeholder.com/150' },
    "rtx4070": { id: 'rtx4070', nombre: 'NVIDIA GeForce RTX 4070', precio: 599.00, categoria: 'GPU', img: 'https://via.placeholder.com/150' },
    "rtx3070": { id: 'rtx3070', nombre: 'NVIDIA GeForce RTX 3070', precio: 450.00, categoria: 'GPU', img: 'https://via.placeholder.com/150' },
    "rx7900xtx": { id: 'rx7900xtx', nombre: 'AMD Radeon RX 7900 XTX', precio: 999.00, categoria: 'GPU', img: 'https://via.placeholder.com/150' },
    "rx7800xt": { id: 'rx7800xt', nombre: 'AMD Radeon RX 7800 XT', precio: 499.00, categoria: 'GPU', img: 'https://via.placeholder.com/150' },
    "rx6800xt": { id: 'rx6800xt', nombre: 'AMD Radeon RX 6800 XT', precio: 399.00, categoria: 'GPU', img: 'https://via.placeholder.com/150' },

    // Procesadores Intel
    "i913900k": { id: 'i913900k', nombre: 'Intel Core i9-13900K', precio: 599.00, categoria: 'CPU', img: 'https://via.placeholder.com/150' },
    "i712700k": { id: 'i712700k', nombre: 'Intel Core i7-12700K', precio: 350.00, categoria: 'CPU', img: 'https://via.placeholder.com/150' },
    "i512600k": { id: 'i512600k', nombre: 'Intel Core i5-12600K', precio: 250.00, categoria: 'CPU', img: 'https://via.placeholder.com/150' },

    // Procesadores AMD
    "ryzen9700x": { id: 'ryzen9700x', nombre: 'AMD Ryzen 9 7900X', precio: 499.00, categoria: 'CPU', img: 'https://via.placeholder.com/150' },
    "ryzen7700x": { id: 'ryzen7700x', nombre: 'AMD Ryzen 7 7700X', precio: 399.00, categoria: 'CPU', img: 'https://via.placeholder.com/150' },
    "ryzen5700x": { id: 'ryzen5700x', nombre: 'AMD Ryzen 5 7600X', precio: 250.00, categoria: 'CPU', img: 'https://via.placeholder.com/150' },

    // Memoria RAM
    "ramDdr532gb": { id: 'ramDdr532gb', nombre: 'RAM DDR5 32GB', precio: 120.00, categoria: 'RAM', img: 'https://via.placeholder.com/150' },
    "ramDdr516gb": { id: 'ramDdr516gb', nombre: 'RAM DDR5 16GB', precio: 80.00, categoria: 'RAM', img: 'https://via.placeholder.com/150' },
    "ramDdr432gb": { id: 'ramDdr432gb', nombre: 'RAM DDR4 32GB', precio: 90.00, categoria: 'RAM', img: 'https://via.placeholder.com/150' },
    "ramDdr416gb": { id: 'ramDdr416gb', nombre: 'RAM DDR4 16GB', precio: 50.00, categoria: 'RAM', img: 'https://via.placeholder.com/150' },

    // Almacenamiento
    "ssd2tb": { id: 'ssd2tb', nombre: 'SSD NVMe 2TB', precio: 150.00, categoria: 'Almacenamiento', img: 'https://via.placeholder.com/150' },
    "ssd1tb": { id: 'ssd1tb', nombre: 'SSD NVMe 1TB', precio: 80.00, categoria: 'Almacenamiento', img: 'https://via.placeholder.com/150' },
    "ssd500gb": { id: 'ssd500gb', nombre: 'SSD NVMe 500GB', precio: 50.00, categoria: 'Almacenamiento', img: 'https://via.placeholder.com/150' },

    // Placas Madre
    "placaZ790": { id: 'placaZ790', nombre: 'Placa Madre Z790', precio: 250.00, categoria: 'Placa Madre', img: 'https://via.placeholder.com/150' },
    "placaZ690": { id: 'placaZ690', nombre: 'Placa Madre Z690', precio: 200.00, categoria: 'Placa Madre', img: 'https://via.placeholder.com/150' },
    "placaX670": { id: 'placaX670', nombre: 'Placa Madre X670', precio: 280.00, categoria: 'Placa Madre', img: 'https://via.placeholder.com/150' },
    "placaB650": { id: 'placaB650', nombre: 'Placa Madre B650', precio: 180.00, categoria: 'Placa Madre', img: 'https://via.placeholder.com/150' },
    "placaB550": { id: 'placaB550', nombre: 'Placa Madre B550', precio: 120.00, categoria: 'Placa Madre', img: 'https://via.placeholder.com/150' },
    "placaB660": { id: 'placaB660', nombre: 'Placa Madre B660', precio: 150.00, categoria: 'Placa Madre', img: 'https://via.placeholder.com/150' },

    // Fuentes de Poder
    "fuente1000w": { id: 'fuente1000w', nombre: 'Fuente de Poder 1000W', precio: 150.00, categoria: 'Fuente de Poder', img: 'https://via.placeholder.com/150' },
    "fuente850w": { id: 'fuente850w', nombre: 'Fuente de Poder 850W', precio: 120.00, categoria: 'Fuente de Poder', img: 'https://via.placeholder.com/150' },
    "fuente750w": { id: 'fuente750w', nombre: 'Fuente de Poder 750W', precio: 90.00, categoria: 'Fuente de Poder', img: 'https://via.placeholder.com/150' },
    "fuente650w": { id: 'fuente650w', nombre: 'Fuente de Poder 650W', precio: 70.00, categoria: 'Fuente de Poder', img: 'https://via.placeholder.com/150' },

    // Refrigeración
    "coolerLiquido": { id: 'coolerLiquido', nombre: 'Cooler Líquido', precio: 150.00, categoria: 'Refrigeración', img: 'https://via.placeholder.com/150' },
    "coolerAire": { id: 'coolerAire', nombre: 'Cooler por Aire', precio: 50.00, categoria: 'Refrigeración', img: 'https://via.placeholder.com/150' },

    // Periféricos de Gaming
    "mouseGaming": { id: 'mouseGaming', nombre: 'Mouse Gaming', precio: 60.00, categoria: 'Periféricos', img: 'https://via.placeholder.com/150' },
    "tecladoGaming": { id: 'tecladoGaming', nombre: 'Teclado Gaming', precio: 90.00, categoria: 'Periféricos', img: 'https://via.placeholder.com/150' },

    // Laptops
    "laptopASUS": { id: 'laptopASUS', nombre: 'ASUS ROG Strix Scar 17', precio: 3499.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },
    "laptopMSI": { id: 'laptopMSI', nombre: 'MSI Titan GT77', precio: 3199.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },
    "laptopAlien": { id: 'laptopAlien', nombre: 'Alienware X17 R2', precio: 2799.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },
    "laptopRazer": { id: 'laptopRazer', nombre: 'Razer Blade 15', precio: 2299.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },
    "laptopGigabyte": { id: 'laptopGigabyte', nombre: 'Gigabyte AERO 16', precio: 1899.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },
    "laptopLegion": { id: 'laptopLegion', nombre: 'Lenovo Legion 5 Pro', precio: 1399.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },
    "laptopHP": { id: 'laptopHP', nombre: 'HP Omen 16', precio: 1199.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },
    "laptopDell": { id: 'laptopDell', nombre: 'Dell G15 Gaming', precio: 999.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },
    "laptopAcer": { id: 'laptopAcer', nombre: 'Acer Nitro 5', precio: 699.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },
    "laptopASUSBudget": { id: 'laptopASUSBudget', nombre: 'ASUS TUF Gaming F15', precio: 799.99, categoria: 'Laptops', img: 'https://via.placeholder.com/150' },

    // Componentes para Laptops
    "ramLaptop32gb": { id: 'ramLaptop32gb', nombre: 'RAM Laptop 32GB', precio: 150.00, categoria: 'RAM', img: 'https://via.placeholder.com/150' },
    "ramLaptop16gb": { id: 'ramLaptop16gb', nombre: 'RAM Laptop 16GB', precio: 90.00, categoria: 'RAM', img: 'https://via.placeholder.com/150' },
    "coolerLaptop": { id: 'coolerLaptop', nombre: 'Base de Enfriamiento', precio: 40.00, categoria: 'Accesorios', img: 'https://via.placeholder.com/150' }
};

const productosGrafo = {
    // Tarjetas Gráficas
    "rtx4090": [
        { producto: "rtx4080", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "i913900k", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente1000w", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr532gb", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ssd2tb", tipoRelacion: "complementario" }
    ],
    "rtx4080": [
        { producto: "rtx4090", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4070", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "i712700k", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente850w", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr532gb", tipoRelacion: "compatibilidad_rendimiento" }
    ],
    "rtx4070": [
        { producto: "rtx4080", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx3070", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen7700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente750w", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_rendimiento" }
    ],
    "rtx3070": [
        { producto: "rtx4070", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen5700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente650w", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ssd1tb", tipoRelacion: "complementario" }
    ],
    "rx7900xtx": [
        { producto: "rx7800xt", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen9700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente850w", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr532gb", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ssd1tb", tipoRelacion: "complementario" }
    ],
    "rx7800xt": [
        { producto: "rx7900xtx", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rx6800xt", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen7700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente750w", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_rendimiento" }
    ],
    "rx6800xt": [
        { producto: "rx7800xt", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen5700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente650w", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr432gb", tipoRelacion: "compatibilidad_rendimiento" }
    ],

    // Procesadores Intel
    "i913900k": [
        { producto: "i712700k", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4090", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "rtx4080", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr532gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "placaZ790", tipoRelacion: "compatibilidad_critica" },
        { producto: "coolerLiquido", tipoRelacion: "compatibilidad_critica" }
    ],
    "i712700k": [
        { producto: "i913900k", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "i512600k", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4080", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "rtx4070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "placaZ690", tipoRelacion: "compatibilidad_critica" },
        { producto: "coolerAire", tipoRelacion: "compatibilidad_critica" }
    ],
    "i512600k": [
        { producto: "i712700k", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "rtx3070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "placaB660", tipoRelacion: "compatibilidad_critica" },
        { producto: "coolerAire", tipoRelacion: "compatibilidad_critica" }
    ],

    // Procesadores AMD
    "ryzen9700x": [
        { producto: "ryzen7700x", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rx7900xtx", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "rtx4080", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr532gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "placaX670", tipoRelacion: "compatibilidad_critica" },
        { producto: "coolerLiquido", tipoRelacion: "compatibilidad_critica" }
    ],
    "ryzen7700x": [
        { producto: "ryzen9700x", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen5700x", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "rx7800xt", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "placaB650", tipoRelacion: "compatibilidad_critica" },
        { producto: "coolerAire", tipoRelacion: "compatibilidad_critica" }
    ],
    "ryzen5700x": [
        { producto: "ryzen7700x", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx3070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "rx6800xt", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "placaB550", tipoRelacion: "compatibilidad_critica" },
        { producto: "coolerAire", tipoRelacion: "compatibilidad_critica" }
    ],

    // Memoria RAM
    "ramDdr532gb": [
        { producto: "ramDdr516gb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4090", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "i913900k", tipoRelacion: "compatibilidad_critica" },
        { producto: "ryzen9700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "placaX670", tipoRelacion: "compatibilidad_critica" },
        { producto: "ssd2tb", tipoRelacion: "complementario" }
    ],
    "ramDdr516gb": [
        { producto: "ramDdr532gb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ramDdr432gb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "i712700k", tipoRelacion: "compatibilidad_critica" },
        { producto: "ryzen7700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "placaB650", tipoRelacion: "compatibilidad_critica" },
        { producto: "ssd1tb", tipoRelacion: "complementario" }
    ],
    "ramDdr432gb": [
        { producto: "ramDdr516gb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ramDdr416gb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx3070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ryzen5700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "placaB550", tipoRelacion: "compatibilidad_critica" },
        { producto: "ssd1tb", tipoRelacion: "complementario" },
        { producto: "fuente750w", tipoRelacion: "complementario" }
    ],
    "ramDdr416gb": [
        { producto: "ramDdr432gb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen5700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "rtx3070", tipoRelacion: "compatibilidad_rendimiento" }
    ],

    // Almacenamiento
    "ssd2tb": [
        { producto: "ssd1tb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4090", tipoRelacion: "complementario" },
        { producto: "i913900k", tipoRelacion: "complementario" },
        { producto: "ramDdr532gb", tipoRelacion: "complementario" },
        { producto: "placaX670", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente1000w", tipoRelacion: "complementario" }
    ],
    "ssd1tb": [
        { producto: "ssd2tb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ssd500gb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4070", tipoRelacion: "complementario" },
        { producto: "rtx3070", tipoRelacion: "complementario" },
        { producto: "ramDdr516gb", tipoRelacion: "complementario" },
        { producto: "placaB650", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente750w", tipoRelacion: "complementario" }
    ],
    "ssd500gb": [
        { producto: "ssd1tb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "i512600k", tipoRelacion: "complementario" },
        { producto: "ryzen5700x", tipoRelacion: "complementario" },
        { producto: "ramDdr516gb", tipoRelacion: "complementario" },
        { producto: "placaB550", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente650w", tipoRelacion: "complementario" }
    ],

    // Placas Madre
    "placaZ790": [
        { producto: "placaZ690", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "placaX670", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "i913900k", tipoRelacion: "compatibilidad_critica" },
        { producto: "ramDdr532gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "rtx4090", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "coolerLiquido", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente1000w", tipoRelacion: "compatibilidad_rendimiento" }
    ],
    "placaZ690": [
        { producto: "placaZ790", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "placaB660", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "i712700k", tipoRelacion: "compatibilidad_critica" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_critica" }
    ],
    "placaX670": [
        { producto: "placaZ790", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "placaB650", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen9700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "ramDdr532gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "rx7900xtx", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "coolerLiquido", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente850w", tipoRelacion: "compatibilidad_rendimiento" }
    ],
    "placaB650": [
        { producto: "placaX670", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "placaB550", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen7700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "rtx4070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "coolerAire", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente750w", tipoRelacion: "compatibilidad_rendimiento" }
    ],
    "placaB550": [
        { producto: "placaB650", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "ryzen5700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "ramDdr516gb", tipoRelacion: "compatibilidad_critica" },
        { producto: "rtx3070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "coolerAire", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente650w", tipoRelacion: "compatibilidad_rendimiento" }
    ],
    "placaB660": [
        { producto: "placaZ690", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "i512600k", tipoRelacion: "compatibilidad_critica" },
        { producto: "ramDdr432gb", tipoRelacion: "compatibilidad_critica" }
    ],

    // Fuentes de Poder
    "fuente1000w": [
        { producto: "fuente850w", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4090", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "i913900k", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr532gb", tipoRelacion: "complementario" },
        { producto: "ssd2tb", tipoRelacion: "complementario" },
        { producto: "coolerLiquido", tipoRelacion: "complementario" }
    ],
    "fuente850w": [
        { producto: "fuente1000w", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "fuente750w", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4080", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ryzen9700x", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr532gb", tipoRelacion: "complementario" },
        { producto: "ssd1tb", tipoRelacion: "complementario" },
        { producto: "coolerLiquido", tipoRelacion: "complementario" }
    ],
    "fuente750w": [
        { producto: "fuente850w", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "fuente650w", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx4070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ryzen7700x", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr516gb", tipoRelacion: "complementario" },
        { producto: "ssd1tb", tipoRelacion: "complementario" },
        { producto: "coolerAire", tipoRelacion: "complementario" }
    ],
    "fuente650w": [
        { producto: "fuente750w", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "rtx3070", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ryzen5700x", tipoRelacion: "compatibilidad_rendimiento" },
        { producto: "ramDdr516gb", tipoRelacion: "complementario" },
        { producto: "ssd500gb", tipoRelacion: "complementario" },
        { producto: "coolerAire", tipoRelacion: "complementario" }
    ],

    // Refrigeración
    "coolerLiquido": [
        { producto: "coolerAire", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "i913900k", tipoRelacion: "compatibilidad_critica" },
        { producto: "ryzen9700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "rtx4090", tipoRelacion: "complementario" },
        { producto: "placaZ790", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente1000w", tipoRelacion: "complementario" }
    ],
    "coolerAire": [
        { producto: "coolerLiquido", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "i712700k", tipoRelacion: "compatibilidad_critica" },
        { producto: "ryzen7700x", tipoRelacion: "compatibilidad_critica" },
        { producto: "rtx4070", tipoRelacion: "complementario" },
        { producto: "placaB650", tipoRelacion: "compatibilidad_critica" },
        { producto: "fuente750w", tipoRelacion: "complementario" }
    ],

    // Periféricos de Gaming
    "mouseGaming": [
        { producto: "tecladoGaming", tipoRelacion: "complementario" },
        { producto: "laptopASUS", tipoRelacion: "periferico" },
        { producto: "laptopMSI", tipoRelacion: "periferico" },
        { producto: "laptopAlien", tipoRelacion: "periferico" },
        { producto: "laptopRazer", tipoRelacion: "periferico" },
        { producto: "i913900k", tipoRelacion: "periferico" } // Representa una PC de escritorio
    ],
    "tecladoGaming": [
        { producto: "mouseGaming", tipoRelacion: "complementario" },
        { producto: "laptopMSI", tipoRelacion: "periferico" },
        { producto: "laptopRazer", tipoRelacion: "periferico" },
        { producto: "ryzen9700x", tipoRelacion: "periferico" }
    ],

    // Laptops
    "laptopASUS": [
        { producto: "laptopMSI", tipoRelacion: "alternativa" },
        { producto: "laptopAlien", tipoRelacion: "alternativa" },
        { producto: "mouseGaming", tipoRelacion: "periferico" },
        { producto: "tecladoGaming", tipoRelacion: "periferico" }
    ],
    "laptopMSI": [
        { producto: "laptopASUS", tipoRelacion: "alternativa" },
        { producto: "laptopAlien", tipoRelacion: "alternativa" },
        { producto: "mouseGaming", tipoRelacion: "periferico" },
        { producto: "tecladoGaming", tipoRelacion: "periferico" }
    ],
    "laptopAlien": [
        { producto: "laptopASUS", tipoRelacion: "alternativa" },
        { producto: "laptopMSI", tipoRelacion: "alternativa" },
        { producto: "mouseGaming", tipoRelacion: "periferico" },
        { producto: "tecladoGaming", tipoRelacion: "periferico" }
    ],
    "laptopRazer": [
        { producto: "laptopGigabyte", tipoRelacion: "alternativa" },
        { producto: "mouseGaming", tipoRelacion: "periferico" }
    ],
    "laptopGigabyte": [
        { producto: "laptopRazer", tipoRelacion: "alternativa" },
        { producto: "laptopLegion", tipoRelacion: "alternativa" }
    ],
    "laptopLegion": [
        { producto: "laptopHP", tipoRelacion: "alternativa" },
        { producto: "laptopDell", tipoRelacion: "alternativa" }
    ],
    "laptopHP": [
        { producto: "laptopLegion", tipoRelacion: "alternativa" },
        { producto: "laptopDell", tipoRelacion: "alternativa" }
    ],
    "laptopDell": [
        { producto: "laptopLegion", tipoRelacion: "alternativa" },
        { producto: "laptopHP", tipoRelacion: "alternativa" }
    ],
    "laptopAcer": [
        { producto: "laptopASUSBudget", tipoRelacion: "alternativa" }
    ],
    "laptopASUSBudget": [
        { producto: "laptopAcer", tipoRelacion: "alternativa" }
    ],

    // Componentes específicos para Laptops (para dejar claro que son upgrades)
    "ramLaptop32gb": [
        { producto: "ramLaptop16gb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "laptopASUS", tipoRelacion: "compatibilidad_critica" },
        { producto: "laptopAlien", tipoRelacion: "compatibilidad_critica" },
        { producto: "laptopRazer", tipoRelacion: "compatibilidad_critica" }
    ],
    "ramLaptop16gb": [
        { producto: "ramLaptop32gb", tipoRelacion: "excluyente" }, // CAMBIO A EXCLUYENTE
        { producto: "laptopMSI", tipoRelacion: "compatibilidad_critica" }
    ],
    "coolerLaptop": [
        { producto: "laptopASUS", tipoRelacion: "complementario" },
        { producto: "laptopMSI", tipoRelacion: "complementario" },
        { producto: "laptopAlien", tipoRelacion: "complementario" },
        { producto: "laptopRazer", tipoRelacion: "complementario" }
    ]
};

// --- FILTROS Y LÓGICA DE LA INTERFAZ ---
const filterButtons = document.querySelectorAll(".filter-btn");
const productCardsContainer = document.querySelector(".product-cards");

// Función para aplicar filtro
function applyFilter(filter) {
    // Esconder todas las tarjetas
    document.querySelectorAll('.product-card').forEach(card => card.style.display = 'none');

    // Mostrar las que coinciden con el filtro
    const filteredCards = document.querySelectorAll(`.product-card[data-category="${filter}"]`);
    if (filter === "all") {
        document.querySelectorAll('.product-card').forEach(card => card.style.display = 'block');
    } else {
        filteredCards.forEach(card => card.style.display = 'block');
    }
}

// Detectar clic en botones de filtro
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Elimina la clase 'active' de todos los botones de filtro
        filterButtons.forEach(btn => btn.classList.remove("active"));
        
        // Añade la clase 'active' al botón que se hizo clic
        button.classList.add("active");
        
        const filter = button.dataset.filter;
        applyFilter(filter);
    });
});

// Leer el parámetro de la URL al cargar la página
const urlParams = new URLSearchParams(window.location.search);
const filtroInicial = urlParams.get("filtro");

if (filtroInicial) {
    applyFilter(filtroInicial); // Aplica el filtro inicial
}

// --- RESTO DEL CÓDIGO ---
// ... (el resto de tus funciones y lógica)
// ...

// Cuando la página se carga, aplica el filtro inicial o muestra todo
window.addEventListener("DOMContentLoaded", () => {
    // ...
    // Aplicar el filtro inicial después de generar las tarjetas
    const activeFilterButton = document.querySelector(`.filter-btn[data-filter="${filtroInicial}"]`);
    if (filtroInicial && activeFilterButton) {
        applyFilter(filtroInicial);
        activeFilterButton.classList.add("active");
    } else {
        // Si no hay filtro inicial en la URL, se activa el botón 'all'
        applyFilter('all');
        const allButton = document.querySelector(`.filter-btn[data-filter="all"]`);
        if (allButton) {
            allButton.classList.add("active");
        }
    }
});

// --- FUNCIONES AUXILIARES ---
const prioridadRelacion = {
    "compatibilidad_critica": 1,
    "compatibilidad_rendimiento": 2,
    "complementario": 3,
    "periferico": 4,
    "alternativa": 5,
    "excluyente": 6
};


// --- Funciones del sistema ---
let cart = [];
const CART_STORAGE_KEY = "userCart";
const PROMO_CODES = { "DESCUENTO10": 0.10, "FREESHIP": "gratis" };

function getProductDetails(productId) {
    return productos[productId];
}

function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
    const cartDisplayElement = document.querySelector('.cart-container');
    if (cartDisplayElement) {
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartEmptyMessage = document.getElementById("cart-empty");
    const cartSummaryContainer = document.getElementById("cart-summary");

    if (!cartItemsContainer || !cartEmptyMessage || !cartSummaryContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartEmptyMessage.style.display = 'flex';
        cartSummaryContainer.style.display = 'none';
        return;
    }

    cartEmptyMessage.style.display = 'none';
    cartSummaryContainer.style.display = 'flex';
    cartItemsContainer.innerHTML = '';

    const productCounts = {};
    cart.forEach(productId => {
        productCounts[productId] = (productCounts[productId] || 0) + 1;
    });

    Object.entries(productCounts).forEach(([productId, count]) => {
        const product = getProductDetails(productId);
        if (product) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${product.img || 'https://via.placeholder.com/100'}" alt="${product.nombre}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3>${product.nombre}</h3>
                    <p>Categoría: ${product.categoria}</p>
                </div>
                <div class="cart-item-price">
                    <span>$${(product.precio * count).toFixed(2)}</span>
                </div>
                <div class="cart-item-actions">
                    <input type="number" value="${count}" min="1" onchange="updateCartItemCount('${productId}', this.value)" class="cart-item-quantity">
                    <button class="btn-remove" onclick="removeFromCart('${productId}')">
                        <span class="icon-remove">X</span>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        }
    });

    updateCartSummary();
}

function updateCartItemCount(productId, newCount) {
    const count = parseInt(newCount, 10);
    if (isNaN(count) || count < 1) return;

    cart = cart.filter(id => id !== productId);
    for (let i = 0; i < count; i++) {
        cart.push(productId);
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

function updateCartSummary() {
    let subtotal = 0;
    cart.forEach(productId => {
        const product = getProductDetails(productId);
        if (product) {
            subtotal += product.precio;
        }
    });

    const taxesRate = 0.10;
    const taxes = subtotal * taxesRate;

    const shippingRadios = document.getElementsByName('shipping');
    let shippingCost = 0;
    for (const radio of shippingRadios) {
        if (radio.checked) {
            shippingCost = parseFloat(radio.value);
            break;
        }
    }

    let total = subtotal + taxes + shippingCost;

    const promoInput = document.getElementById("promo-input");
    if (promoInput) {
        const promoCode = promoInput.value.trim().toUpperCase();
        if (PROMO_CODES[promoCode]) {
            const promoValue = PROMO_CODES[promoCode];
            if (promoValue === "gratis") {
                shippingCost = 0;
                document.getElementById("shipping").textContent = `$0.00`;
                total = subtotal + taxes;
            } else {
                const discount = subtotal * promoValue;
                total -= discount;
            }
        }
    }

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("taxes").textContent = `$${taxes.toFixed(2)}`;
    document.getElementById("shipping").textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;

    const modalTotalElement = document.getElementById("modal-total");
    if (modalTotalElement) {
        modalTotalElement.textContent = `$${total.toFixed(2)}`;
    }
    const modalItemsCountElement = document.getElementById("modal-items-count");
    if (modalItemsCountElement) {
        modalItemsCountElement.textContent = cart.length;
    }
}

function addToCart(productId) {
    const productToAdd = getProductDetails(productId);
    if (productToAdd) {
        cart.push(productId);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartCount();
        
        // --- CÓDIGO A AGREGAR ---
        alert(`${productToAdd.nombre} ha sido agregado al carrito.`);
        // --- FIN DEL CÓDIGO A AGREGAR ---
        
    }
}

function removeFromCart(productId) {
    // Filtra el array para remover TODAS las instancias del producto
    const newCart = cart.filter(id => id !== productId);
    cart = newCart;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

function proceedToCheckout() {
    document.getElementById("checkout-modal").style.display = "flex";
}
function closeCheckoutModal() {
    document.getElementById("checkout-modal").style.display = "none";
}
function confirmPurchase() {
    const orderNumber = Math.floor(Math.random() * 1000000);
    document.getElementById("order-number").textContent = orderNumber;
    closeCheckoutModal();
    document.getElementById("success-modal").style.display = "flex";

    cart = [];
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartCount();
}
function closeSuccessModal() {
    document.getElementById("success-modal").style.display = "none";
}
function continueShopping() {
    window.location.href = "/componentes/";
}
function applyPromoCode() {
    updateCartSummary();
}

function obtenerRecomendaciones(productoId, carritoActualIds = [], cantidad = 4) {
    const recomendacionesFiltradas = [];
    const idsRecomendadosSet = new Set(carritoActualIds);
    const relacionesDirectas = productosGrafo[productoId] || [];

    relacionesDirectas.sort((a, b) => prioridadRelacion[a.tipoRelacion] - prioridadRelacion[b.tipoRelacion]);

    for (const rel of relacionesDirectas) {
        if (idsRecomendadosSet.has(rel.producto) || rel.producto === productoId || rel.tipoRelacion === "excluyente") {
            continue;
        }
        const productoRecomendado = getProductDetails(rel.producto);
        if (!productoRecomendado) continue;
        recomendacionesFiltradas.push(productoRecomendado);
        idsRecomendadosSet.add(rel.producto);
        if (recomendacionesFiltradas.length >= cantidad) break;
    }
    return recomendacionesFiltradas.slice(0, cantidad);
}

function crearTarjetaProducto(producto, esRecomendacion = false) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.dataset.category = producto.categoria; // AHORA SÍ ASIGNA LA CATEGORÍA CORRECTA

    if (esRecomendacion) {
        card.classList.add('recommendation-card');
    }
    card.innerHTML = `
        <img src="${producto.img || 'https://via.placeholder.com/150'}" alt="${producto.nombre}" style="width:100px; height:100px; object-fit:cover;">
        <h3>${producto.nombre}</h3>
        <p>Categoría: ${producto.categoria}</p>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <button onclick="addToCart('${producto.id}')">Añadir al Carrito</button>
    `;
    return card;
}

function mostrarRecomendaciones(productoId, containerId, currentCartIds = []) {
    const recomendaciones = obtenerRecomendaciones(productoId, currentCartIds);
    const container = document.getElementById(containerId);
    const gridContainer = document.getElementById(containerId + '-grid');

    if (recomendaciones.length > 0 && container && gridContainer) {
        container.style.display = 'block';
        gridContainer.innerHTML = '';

        recomendaciones.forEach(producto => {
            const card = crearTarjetaProducto(producto, true);
            gridContainer.appendChild(card);
        });
    } else if (container) {
        container.style.display = 'none';
    }
}

/**
 * Función que encuentra el camino más corto (más barato) entre dos productos usando el algoritmo de Dijkstra.
 * @param {string} startProductId - El ID del producto de inicio.
 * @param {string} endProductId - El ID del producto de destino.
 * @returns {object} - Un objeto con el camino (array de IDs) y el costo total.
 */
function findCheapestPath(startProductId, endProductId) {
    const distances = {};
    const previous = {};
    const priorityQueue = {};

    // Inicializar distancias y `previous`
    for (let productId in productos) {
        distances[productId] = Infinity;
        previous[productId] = null;
    }

    distances[startProductId] = 0;
    priorityQueue[startProductId] = 0;

    const visitedCategories = new Set(); // Conjunto para registrar categorías visitadas

    while (Object.keys(priorityQueue).length > 0) {
        let currentNode = Object.keys(priorityQueue).reduce((a, b) => priorityQueue[a] < priorityQueue[b] ? a : b, null);
        delete priorityQueue[currentNode];

        if (currentNode === endProductId) {
            break;
        }

        const currentNodeRelations = productosGrafo[currentNode] || [];
        const currentCategory = productos[currentNode].categoria;
        
        // Agregar la categoría del nodo actual al conjunto de categorías visitadas.
        if (!visitedCategories.has(currentCategory)) {
            visitedCategories.add(currentCategory);
        }

        for (let relation of currentNodeRelations) {
            const neighborId = relation.producto;
            const neighbor = productos[neighborId];

            if (!neighbor) continue;

            // Evitar productos de la misma categoría en el camino
            if (visitedCategories.has(neighbor.categoria) && neighborId !== endProductId) {
                continue;
            }
            
            const relationshipCost = costoRelacion[relation.tipoRelacion] || 10000;
            const newDistance = distances[currentNode] + neighbor.precio + relationshipCost;

            if (newDistance < distances[neighborId]) {
                distances[neighborId] = newDistance;
                previous[neighborId] = currentNode;
                priorityQueue[neighborId] = newDistance;
            }
        }
    }
    
    // Reconstruir el camino
    const path = [];
    let current = endProductId;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }
    
    if (path.length === 0 || path[0] !== startProductId) {
        return { path: null, cost: null };
    }

    return { path, cost: distances[endProductId] };
}

// Inicialización
window.addEventListener("DOMContentLoaded", () => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error("Error al parsear el carrito guardado:", e);
            cart = [];
        }
    }
    updateCartCount();

    const shippingRadios = document.getElementsByName('shipping');
    if (shippingRadios.length > 0) {
        shippingRadios.forEach(radio => {
            radio.addEventListener('change', updateCartSummary);
        });
    }
});

// MENÚ HAMBURGUESA
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.classList.toggle("active");
    });
}