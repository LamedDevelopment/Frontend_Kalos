import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  [x: string]: any;
  Peluquerias = [
        {
          "nombre": "Salón de Belleza Bella",
          "servicios": [
            "Corte de cabello",
            "Peinados",
            "Coloración",
            "Tratamientos capilares",
            "Maquillaje"
          ],
          "Teams": [
            {
              "nombre": "Juan Pérez",
              "servicios": [
                "Corte de cabello",
                "Peinados"
              ]
            },
            {
              "nombre": "María López",
              "servicios": [
                "Coloración",
                "Maquillaje"
              ]
            },
            {
              "nombre": "Pedro Martínez",
              "servicios": [
                "Tratamientos capilares",
                "Corte de cabello"
              ]
            },
            {
              "nombre": "Ana García",
              "servicios": [
                "Peinados",
                "Coloración"
              ]
            },
            {
              "nombre": "Carlos Ramírez",
              "servicios": [
                "Maquillaje",
                "Tratamientos capilares"
              ]
            }
          ],
          calificacion: 4.5,
          reviews: 40,
          description: 'Peluquería y barbería central Peluqueria',
        },
        {
          "nombre": "Salón de Belleza Elegante",
          "servicios": [
            "Corte de cabello",
            "Manicura y pedicura",
            "Tratamientos faciales",
            "Depilación",
            "Masajes"
          ],
          "Teams": [
            {
              "nombre": "Laura Sánchez",
              "servicios": [
                "Corte de cabello",
                "Depilación"
              ]
            },
            {
              "nombre": "Mario Rodríguez",
              "servicios": [
                "Manicura y pedicura",
                "Masajes"
              ]
            },
            {
              "nombre": "Sofía Herrera",
              "servicios": [
                "Tratamientos faciales",
                "Corte de cabello"
              ]
            },
            {
              "nombre": "Javier Torres",
              "servicios": [
                "Depilación",
                "Manicura y pedicura"
              ]
            },
            {
              "nombre": "Fernanda Gómez",
              "servicios": [
                "Masajes",
                "Tratamientos faciales"
              ]
            }
            ],
          calificacion: 4.5,
          reviews: 40,
          description: 'Peluquería y barbería central Peluqueria',
        },
        {
          "nombre": "Salón de Belleza Estilo",
          "servicios": [
            "Corte de cabello",
            "Peinados",
            "Coloración",
            "Maquillaje",
            "Tratamientos capilares"
          ],
          "Teams": [
            {
              "nombre": "Ricardo Torres",
              "servicios": [
                "Corte de cabello",
                "Peinados"
              ]
            },
            {
              "nombre": "Carolina López",
              "servicios": [
                "Coloración",
                "Maquillaje"
              ]
            },
            {
              "nombre": "Daniel Gómez",
              "servicios": [
                "Tratamientos capilares",
                "Corte de cabello"
              ]
            },
            {
              "nombre": "Gabriela Martínez",
              "servicios": [
                "Peinados",
                "Coloración"
              ]
            },
            {
              "nombre": "Andrés Pérez",
              "servicios": [
                "Maquillaje",
                "Tratamientos capilares"
              ]
            }
            ],
          calificacion: 4.5,
          reviews: 40,
          description: 'Peluquería y barbería central Peluqueria',
        },
        {
          "nombre": "Spa de Uñas Glamour",
          "servicios": [
            "Spa de Uñas",
            "Manicura",
            "Maquillaje",
            "Masajes",
            "Exfoliación",
            "Pedicure"
          ],
          "Teams": [
            {
              "nombre": "Valentina Sánchez",
              "servicios": [
                "Corte de cabello",
                "Depilación"
              ]
            },
            {
              "nombre": "Hugo Rodríguez",
              "servicios": [
                "Manicura y pedicura",
                "Peinados"
              ]
            },
            {
              "nombre": "Julia Torres",
              "servicios": [
                "Tratamientos faciales",
                "Corte de cabello"
              ]
            },
            {
              "nombre": "Diego Gómez",
              "servicios": [
                "Depilación",
                "Manicura y pedicura"
              ]
            },
            {
              "nombre": "Laura Pérez",
              "servicios": [
                "Peinados",
                "Tratamientos faciales"
              ]
            }
            ],
          calificacion: 4.5,
          reviews: 40,
          description: 'Peluquería y barbería central Peluqueria',
        },
        {
          "nombre": "Salón de Belleza Elegancia",
          "servicios": [
            "Corte de cabello",
            "Maquillaje",
            "Coloración",
            "Peinados",
            "Tratamientos capilares"
          ],
          "Teams": [
            {
              "nombre": "Rodrigo Sánchez",
              "servicios": [
                "Corte de cabello",
                "Peinados"
              ]
            },
            {
              "nombre": "Marina Rodríguez",
              "servicios": [
                "Coloración",
                "Maquillaje"
              ]
            },
            {
              "nombre": "Fernando Gómez",
              "servicios": [
                "Tratamientos capilares",
                "Corte de cabello"
              ]
            },
            {
              "nombre": "Alejandra Torres",
              "servicios": [
                "Peinados",
                "Coloración"
              ]
            },
            {
              "nombre": "Roberto Pérez",
              "servicios": [
                "Maquillaje",
                "Tratamientos capilares"
              ]
            }
            ],
          calificacion: 4.5,
          reviews: 40,
          description: 'Peluquería y barbería central Peluqueria',
        },
        {
          "nombre": "Salón de Belleza Clásico",
          "servicios": [
            "Corte de cabello",
            "Depilación",
            "Coloración",
            "Tratamientos faciales",
            "Peinados"
          ],
          "Teams": [
            {
              "nombre": "Camila Sánchez",
              "servicios": [
                "Corte de cabello",
                "Depilación"
              ]
            },
            {
              "nombre": "Andrés Rodríguez",
              "servicios": [
                "Coloración",
                "Peinados"
              ]
            },
            {
              "nombre": "Daniela Gómez",
              "servicios": [
                "Tratamientos faciales",
                "Corte de cabello"
              ]
            },
            {
              "nombre": "Martín Torres",
              "servicios": [
                "Depilación",
                "Coloración"
              ]
            },
            {
              "nombre": "Sara Pérez",
              "servicios": [
                "Peinados",
                "Tratamientos faciales"
              ]
            }
          ],
          calificacion: 4.5,
          reviews: 40,
          description: 'Peluquería y barbería central Peluqueria',
        },
        {
          "nombre": "Salón de Belleza Moderno",
          "servicios": [
            "Corte de cabello",
            "Manicura y pedicura",
            "Maquillaje",
            "Depilación",
            "Peinados"
          ],
          "Teams": [
            {
              "nombre": "Isabella Sánchez",
              "servicios": [
                "Corte de cabello",
                "Depilación"
              ]
            },
            {
              "nombre": "Sebastián Rodríguez",
              "servicios": [
                "Manicura y pedicura",
                "Peinados"
              ]
            },
            {
                "nombre": "Valeria Gómez",

              "servicios": [
                "Maquillaje",
                "Corte de cabello"
              ]
            },
            {
              "nombre": "Jorge Torres",
              "servicios": [
                "Depilación",
                "Manicura y pedicura"
              ]
            },
            {
              "nombre": "María Pérez",
              "servicios": [
                "Peinados",
                "Maquillaje"
              ]
            }
            ],
          calificacion: 4.5,
          reviews: 40,
          description: 'Peluquería y barbería central Peluqueria',
        },
        {
          "nombre": "Salón de Belleza Chic",
          "servicios": [
            "Corte de cabello",
            "Coloración",
            "Tratamientos faciales",
            "Maquillaje",
            "Peinados"
          ],
          "Teams": [
            {
              "nombre": "Valentina Sánchez",
              "servicios": [
                "Corte de cabello",
                "Coloración"
              ]
            },
            {
              "nombre": "Hugo Rodríguez",
              "servicios": [
                "Tratamientos faciales",
                "Peinados"
              ]
            },
            {
              "nombre": "Julia Gómez",
              "servicios": [
                "Maquillaje",
                "Corte de cabello"
              ]
            },
            {
              "nombre": "Diego Torres",
              "servicios": [
                "Coloración",
                "Tratamientos faciales"
              ]
            },
            {
              "nombre": "Laura Pérez",
              "servicios": [
                "Peinados",
                "Maquillaje"
              ]
            }
            ],
          calificacion: 4.5,
          reviews: 40,
          description: 'Peluquería y barbería central Peluqueria',
        },
        {
          "nombre": "Salón de Belleza Trendy",
          "servicios": [
            "Corte de cabello",
            "Depilación",
            "Coloración",
            "Maquillaje",
            "Peinados"
          ],
          "Teams": [
            {
              "nombre": "Mariana Sánchez",
              "servicios": [
                "Corte de cabello",
                "Coloración"
              ]
            },
            {
              "nombre": "Santiago Rodríguez",
              "servicios": [
                "Depilación",
                "Peinados"
              ]
            },
            {
              "nombre": "Valeria Gómez",
              "servicios": [
                "Maquillaje",
                "Corte de cabello"
              ]
            },
            {
              "nombre": "Jorge Torres",
              "servicios": [
                "Depilación",
                "Maquillaje"
              ]
            },
            {
              "nombre": "María Pérez",
              "servicios": [
                "Peinados",
                "Coloración"
              ]
            }
          ],
          calificacion: 4.5,
          reviews: 40,
          description: 'Peluquería y barbería central Peluqueria',
        }
    ]

    getData() {
        return this.Peluquerias;
    }
}
