const TEXTS = {
    lv: {
        intro: {
            "4-7": [
                "Mēs gribam zināt, kā Tu šodien juties Bērna mājā.",
                "Nav pareizu vai nepareizu atbilžu.",
                "Ja negribi atbildēt uz kādu jautājumu - tas ir pilnīgi normāli un Tu to vari izlaist:)",
            ],
            "8-12": [
                "Mums ir svarīgi zināt, kā Tev gāja Bērna mājā.",
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
                "4-7": ["Slikti", "Tā pa vidu", "Labi"],
                "8-12": ["Slikti", "Normāli", "Labi"],
                "13-18": ["Slikti", "Neitrāli", "Labi"]
            },

            felt_safe: {
                "4-7": ["Nē", "Vidēji", "Jā"],
                "8-12": ["Nē", "Vidēji", "Jā"],
                "13-18": ["Nē", "Daļēji", "Jā"]
            },

            understood_process: {
                "4-7": ["Nesaprotami", "Vidēji", "Ļoti saprotami"],
                "8-12": ["Nesaprotami", "Daļēji saprotami", "Ļoti saprotami"]
            },

            staff_attitude: {
                "4-7": ["Slikti", "Nu tā nevisai", "Labi"],
                "8-12": ["Nedraudzīga", "Neitrāla", "Draudzīga"]
            },

            rooms_overall: {
                "4-7": ["Slikti", "Neitrāli", "Labi"],
                "8-12": ["Slikti", "Neitrāli", "Labi"]
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
                waiting_room: "Viesistaba",
                interview_room: "Sarunu istaba",
                medical_room: "Apskates istaba",
                specialist_room: "Speciālistu istaba"
            },
            slider: {
                left: "Nepatika",
                right: "Patika"
            }
        },

        common: {
            start: "Sākt",
            next: "Tālāk",
            skip: "Izlaist šo jautājumu",
            sending: "Nosūtām..."
        },

        slider_hint: {
            "8-12": "Ja gribi, vari parādīt precīzāk",
            "13-18": "Atzīmē savu vērtējumu"
        },

        intro_title: {
            lv: "Čau!",
        },

        thank_you: {
            title: "Paldies Tev!",
            text: "Tava atbilde ir svarīga un palīdz mums kļūt vēl labākiem."
        }
    },

    ru: {
        intro: {
            "4-7": [
                "Нам важно узнать, как ты сегодня себя чувствовал(а) в Доме для ребёнка.",
                "Здесь нет правильных или неправильных ответов.",
                "Если ты не хочешь отвечать на какой-то вопрос - это нормально, ты можешь его пропустить :)"
            ],
            "8-12": [
                "Нам важно узнать, как ты себя чувствовал(а) в Доме для ребёнка.",
                "Здесь нет правильных или неправильных ответов.",
                "Если ты не хочешь отвечать на какой-то вопрос, ты можешь смело его пропустить."
            ],
            "13-18": [
                "Этот опрос - о твоём опыте в Доме для ребёнка. Он анонимный.",
                "Ты можешь отвечать честно - здесь нет правильных или неправильных ответов.",
                "Если ты не хочешь отвечать на какой-то вопрос, ты можешь спокойно его пропустить."
            ]
        },

        questions: {
            gender: {
                "4-7": "Кто ты?",
                "8-12": "Какой у тебя пол?",
                "13-18": "Какой у тебя пол?"
            },

            felt_overall: {
                "4-7": "Как ты себя чувствовал(а) в Доме для ребёнка (Bērna mājā)?",
                "8-12": "Как ты в целом себя чувствовал(а) в Доме для ребёнка?",
                "13-18": "Как ты в целом себя чувствовал(а) в Доме для ребёнка?"
            },

            felt_safe: {
                "4-7": "Было ли тебе здесь безопасно?",
                "8-12": "Чувствовал(а) ли ты себя здесь в безопасности?",
                "13-18": "Насколько безопасно ты себя чувствовал(а) в Доме ребёнка (Bērna mājā)?"
            },

            understood_process: {
                "4-7": "Тебе было понятно, что здесь будет происходить?",
                "8-12": "Насколько понятно тебе объяснили, что здесь будет происходить?",
                "13-18": "Насколько понятно тебе объяснили, что здесь будет происходить?"
            },

            staff_attitude: {
                "4-7": "Как работники относились к тебе?",
                "8-12": "Как ты оцениваешь отношение сотрудников к тебе?",
                "13-18": "Как ты оцениваешь отношение сотрудников к тебе?"
            },

            rooms_overall: {
                "4-7": "Как тебе понравились комнаты в Доме для ребёнка (Bērna mājā)?",
                "8-12": "Как ты в целом оцениваешь помещения в Доме для ребёнка (Bērna mājā)?",
                "13-18": "Как ты в целом оцениваешь помещения в Доме для ребёнка (Bērna mājā)?"
            },

            general_comment: {
                "4-7": "Если хочешь, можешь что-то добавить",
                "8-12": "Если хочешь, можешь что-то добавить, или рассказать, что мы могли бы делать лучше",
                "13-18": "Если хочешь, можешь оставить комментарий о своём опыте, или рассказать, что мы могли бы делать лучше"
            }
        },

        bubbles: {
            gender: {
                "4-7": ["Девочка", "Мальчик", "Не хочу говорить"],
                "8-12": ["Девочка", "Мальчик", "Не хочу говорить"],
                "13-18": ["Женский", "Мужской", "Не хочу говорить"]
            },

            felt_overall: {
                "4-7": ["Плохо", "Средне", "Хорошо"],
                "8-12": ["Плохо", "Нормально", "Хорошо"],
                "13-18": ["Плохо", "Нейтрально", "Хорошо"]
            },

            felt_safe: {
                "4-7": ["Нет", "Немного", "Да"],
                "8-12": ["Нет", "Немного", "Да"],
                "13-18": ["Нет", "Частично", "Да"]
            },

            understood_process: {
                "4-7": ["Непонятно", "Средне", "Очень понятно"],
                "8-12": ["Непонятно", "Частично понятно", "Очень понятно"]
            },

            staff_attitude: {
                "4-7": ["Плохо", "Не очень", "Хорошо"],
                "8-12": ["Недружелюбное", "Нейтральное", "Дружелюбное"]
            },

            rooms_overall: {
                "4-7": ["Плохо", "Нейтрально", "Хорошо"],
                "8-12": ["Плохо", "Нейтрально", "Хорошо"]
            },

            comment_placeholder: {
                "4-7": "Может помочь взрослый",
                "8-12": "Напиши здесь, если хочешь",
                "13-18": "Твой комментарий (необязательно)"
            }
        },

        slider_labels: {
            felt_safe: {
                left: "Небезопасно",
                right: "Безопасно"
            },
            understood_process: {
                left: "Непонятно",
                right: "Очень понятно"
            },
            staff_attitude: {
                left: "Недружелюбное",
                right: "Очень дружелюбное"
            },
            rooms_overall: {
                left: "Неприятные",
                right: "Очень приятные"
            }
        },

        rooms: {
            title: "В каких помещениях ты был(а)?",
            hint: "Нажми на помещения, в которых ты был(а). Если хочешь, можешь показать подробнее, как тебе там было",
            labels: {
                waiting_room: "Гостиная",
                interview_room: "Комната для беседы",
                medical_room: "Медицинский кабинет",
                specialist_room: "Кабинет специалистов"
            },
            slider: {
                left: "Не понравилось",
                right: "Понравилось"
            }
        },

        common: {
            start: "Начать",
            next: "Далее",
            skip: "Пропустить вопрос",
            sending: "Отправляем..."
        },

        slider_hint: {
            "8-12": "Можешь показать точнее",
            "13-18": "Можешь отметить"
        },

        intro_title: {
            ru: "Привет!"
        },

        thank_you: {
            title: "Спасибо тебе!",
            text: "Твой ответ важен и помогает нам становиться лучше."
        }
    },

    en: {
        intro: {
            "4-7": [
                "We would like to know how you felt today at the Child’s House.",
                "There are no right or wrong answers.",
                "If you don’t want to answer a question, that’s okay — you can skip it :)"
            ],
            "8-12": [
                "It is important for us to know how you felt at the Child’s House.",
                "There are no right or wrong answers.",
                "If you don’t want to answer a question, you can safely skip it."
            ],
            "13-18": [
                "This survey is about your experience at the Child’s House. It is anonymous.",
                "You can answer honestly — there are no right or wrong answers.",
                "If you don’t want to answer a question, you can calmly skip it."
            ]
        },

        questions: {
            gender: {
                "4-7": "Who are you?",
                "8-12": "What is your gender?",
                "13-18": "What is your gender?"
            },

            felt_overall: {
                "4-7": "How did you feel at the Child’s House?",
                "8-12": "How did you feel overall at the Child’s House?",
                "13-18": "How did you feel overall at the Child’s House?"
            },

            felt_safe: {
                "4-7": "Did you feel safe here?",
                "8-12": "Did you feel safe here?",
                "13-18": "How safe did you feel at the Child’s House (Bērna māja)?"
            },

            understood_process: {
                "4-7": "Did you understand what would happen here?",
                "8-12": "How clearly was it explained what would happen here?",
                "13-18": "How clearly was it explained what would happen here?"
            },

            staff_attitude: {
                "4-7": "How did the staff treat you?",
                "8-12": "How do you rate the staff’s attitude toward you?",
                "13-18": "How do you rate the staff’s attitude toward you?"
            },

            rooms_overall: {
                "4-7": "How did you like the rooms at the Child’s House (Bērna māja)?",
                "8-12": "How do you rate the rooms at the Child’s House (Bērna māja) overall?",
                "13-18": "How do you rate the rooms at the Child’s House (Bērna māja) overall?"
            },

            general_comment: {
                "4-7": "If you want, you can add something",
                "8-12": "If you want, you can add something or tell us what we could do better",
                "13-18": "If you want, you can leave a comment about your experience or tell us what we could do better"
            }
        },

        bubbles: {
            gender: {
                "4-7": ["Girl", "Boy", "I don’t want to say"],
                "8-12": ["Girl", "Boy", "I don’t want to say"],
                "13-18": ["Female", "Male", "I don’t want to say"]
            },

            felt_overall: {
                "4-7": ["Bad", "So-so", "Good"],
                "8-12": ["Bad", "Okay", "Good"],
                "13-18": ["Bad", "Neutral", "Good"]
            },

            felt_safe: {
                "4-7": ["No", "A little", "Yes"],
                "8-12": ["No", "A little", "Yes"],
                "13-18": ["No", "Partly", "Yes"]
            },

            understood_process: {
                "4-7": ["Not clear", "So-so", "Very clear"],
                "8-12": ["Not clear", "Partly clear", "Very clear"]
            },

            staff_attitude: {
                "4-7": ["Bad", "Not very good", "Good"],
                "8-12": ["Unfriendly", "Neutral", "Friendly"]
            },

            rooms_overall: {
                "4-7": ["Bad", "Neutral", "Good"],
                "8-12": ["Bad", "Neutral", "Good"]
            },

            comment_placeholder: {
                "4-7": "An adult can help",
                "8-12": "Write here if you want",
                "13-18": "Your comment (optional)"
            }
        },

        slider_labels: {
            felt_safe: {
                left: "Unsafe",
                right: "Safe"
            },
            understood_process: {
                left: "Not clear",
                right: "Very clear"
            },
            staff_attitude: {
                left: "Unfriendly",
                right: "Very friendly"
            },
            rooms_overall: {
                left: "Unpleasant",
                right: "Very pleasant"
            }
        },

        rooms: {
            title: "Which rooms were you in?",
            hint: "Tap the rooms you were in. If you want, you can show more precisely how you felt there",
            labels: {
                waiting_room: "Living room",
                interview_room: "Interview room",
                medical_room: "Medical room",
                specialist_room: "Specialists’ room"
            },
            slider: {
                left: "Did not like",
                right: "Liked"
            }
        },

        common: {
            start: "Start",
            next: "Next",
            skip: "Skip this question",
            sending: "Sending..."
        },

        slider_hint: {
            "8-12": "You can show more precisely",
            "13-18": "You can mark your answer"
        },

        intro_title: {
            en: "Hi!"
        },

        thank_you: {
            title: "Thank you!",
            text: "Your answer is important and helps us become better."
        }
    }

};
