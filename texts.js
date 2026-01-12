const TEXTS = {
    lv: {
        intro: {
            "4-7": [
                "Mēs gribam zināt, kā Tu šodien juties Bērna mājā.",
                "Nav pareizu vai nepareizu atbilžu.",
                "Ja negribi atbildēt uz kādu jautājumu - tas ir pilnīgi normāli un Tu to vari izlaist:)",
            ],
            "8-12": [
                "Mums ir svarīgi zināt, kā Tev bija Bērna mājā.",
                "Nav pareizu vai nepareizu atbilžu.",
                "Ja nevēlies atbildēt uz kādu jautājumu, Tu vari to izlaist."
            ],
            "13-18": [
                "Šī anketa ir par Tavu pieredzi Bērna mājā, tā ir anonīma.",
                "Tu vari atbildēt godīgi – nav pareizu vai nepareizu atbilžu.",
                "Ja nevēlies atbildēt uz kādu jautājumu, Tu droši vari to izlaist."
            ]
        },

        questions: {
            gender: {
                "4-7": "Kas Tu esi?",
                "8-12": "Kāds ir Tavs dzimums?",
                "13-18": "Kāds ir Tavs dzimums?"
            },

            felt_overall: {
                "4-7": "Kā Tu juties Bērna mājā?",
                "8-12": "Kā Tu kopumā juties Bērna mājā?",
                "13-18": "Kā Tu kopumā juties Bērna mājā?"
            },
            felt_safe: {
                "4-7": "Vai Tev šeit bija droši?",
                "8-12": "Vai Tu šeit juties droši?",
                "13-18": "Cik droši Tu juties Bērna mājā?"
            },

            understood_process: {
                "4-7": "Cik saprotami Tev pastāstīja, kas šeit notiks?",
                "8-12": "Cik saprotami Tev pastāstīja, kas šeit notiks?",
                "13-18": "Cik saprotami Tev paskaidroja, kas šeit notiks?"
            },
            staff_attitude: {
                "4-7": "Kā darbinieki izturējās pret Tevi?",
                "8-12": "Kā Tu vērtē darbinieku attieksmi pret Tevi?",
                "13-18": "Kā Tu vērtē darbinieku attieksmi pret Tevi?"
            },
            rooms_overall: {
                "4-7": "Kā Tu kopumā vērtē telpas Bērna mājā?",
                "8-12": "Kā Tu kopumā vērtē telpas Bērna mājā?",
                "13-18": "Kā Tu kopumā vērtē telpas Bērna mājā?"
            },
            general_comment: {
                "4-7": "Ja gribi, vari kaut ko piebilst",
                "8-12": "Ja gribi, vari kaut ko piebilst vai pastāstīt",
                "13-18": "Ja vēlies, vari atstāt komentāru par savu pieredzi"
            },

        },

        bubbles: {
            gender: {
                "4-7": ["Meitene", "Zēns", "Negribu teikt"],
                "8-12": ["Meitene", "Zēns", "Negribu teikt"],
                "13-18": ["Sieviete", "Vīrietis", "Negribu teikt"]
            },

            felt_overall: {
                "4-7": ["Labi", "Tā pa vidu", "Slikti"],
                "8-12": ["Labi", "Normāli", "Slikti"],
                "13-18": ["Labi", "Neitrāli", "Slikti"]
            },
            felt_safe: {
                "4-7": ["Jā", "Vidēji", "Nē"],
                "8-12": ["Jā", "Vidēji", "Nē"],
                "13-18": ["Jā", "Daļēji", "Nē"]
            },
            understood_process: {
                "4-7": ["Ļoti saprotami", "Vidēji", "Nesaprotami"],
                "8-12": ["Ļoti saprotami", "Daļēji saprotami", "Nesaprotami"]
            },
            staff_attitude: {
                "4-7": ["Labi", "Nu tā nevisai", "Slikti"],
                "8-12": ["Draudzīga", "Neitrāla", "Nedraudzīga"],
            },
            rooms_overall: {
                "4-7": ["Labi", "Neitrāli", "Slikti"],
                "8-12": ["Labi", "Neitrāli", "Slikti"]
            },
            comment_placeholder: {
                "4-7": "Var palīdzēt pieaugušais",
                "8-12": "Raksti šeit, ja gribi",
                "13-18": "Tavs komentārs (nav obligāti)"
            }
        },


        slider_labels: {
            felt_safe: {
                left: "Nedroši",
                right: "Droši"
            },
            understood_process: {
                left: "Nesaprotami",
                right: "Ļoti saprotami"
            },
            staff_attitude: {
                left: "Nedraudzīga",
                right: "Ļoti draudzīga"
            },
            rooms_overall: {
                left: "Nepatīkamas",
                right: "Ļoti patīkamas"
            }
        },

        rooms: {
            title: "Kurās telpās Tu biji?",
            hint: "Uzspied uz telpām, kurās Tu biji. Ja gribi, vari parādīt precīzāk, kā Tev tur bija",
            labels: {
                waiting_room: "Uzgaidāmā telpa",
                interview_room: "Sarunu telpa",
                medical_room: "Ārsta kabinets",
                specialist_room: "Speciālista telpa"
            },
            slider: {
                left: "Nepatika",
                right: "Patika"
            }
        },

        common: {
            start: "Sākt",
            next: "Tālāk",
            skip: "Izlaist šo jautājumu"
        }
    }
};
