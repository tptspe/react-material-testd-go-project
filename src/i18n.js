import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {

                    loginHeading: "Please enter email and phone number",
                    loginp1: "We need this information in order to",
                    loginp2: "contact you to confirm your test appointment",
                    loginp2_vaccine: "contact you to confirm your vaccination appointment",
                    loginp3: "and to securely share test results with you.",
                    loginp3_vaccine: "and to securely share vaccination with you.",
                    loginEnterEmail: "Enter your email address",
                    loginEnterPhone: "Enter your phone number",
                    loginEmailLabel: "Email address",
                    loginPhoneLabel: "Phone Number",
                    loginSubmitBtn: "SUBMIT",
                    welcomeHeading1: "Welcome to",
                    welcomeHeading2: "Scheduling Assistant",
                    welcomeList1: "Answer a few questions about symptoms, travel and contact you’ve had with others.",
                    welcomeList2: "Your answers will not be shared with <span>{{name}}</span> or others without your permission.",
                    welcomeTerm1: "By using this tool, you agree to its terms and that {{name}} will not be liable for any harm relating to your use.",
                    welcomeTerm2: "Recommendations provided by this tool do not constitute medical advice and should not be used to diagnose or treat medical condition.",
                    welcomeTermLabel: "Accept Terms and Conditions",
                    welcomeNextBtn: "Next",
                    question1_heading: "Are you experiencing <br/> any of these symptoms?",
                    question1_heading_sub: "Select all that apply. If none,<br /> proceed to the next screen.",
                    question1_back: "BACK",
                    question1_next: "NEXT",
                    question1_option1: "Fever, chills, or sweating",
                    question1_option2: "If you have a fever what is your temp?",
                    question1_option3: "Difficulty breathing (not severe)",
                    question1_option4: "New or worsening cough",
                    question1_option5: "Sore throat?",
                    question2_heading: "Do any of these describe<br /> your condition?",
                    question2_heading_sub: "Select all that apply. If none,<br /> proceed to the next screen.",
                    question2_option1: "Do you suffer from COPD or asthma?",
                    question2_option2: "Do you smoke?",
                    question2_option3: "Are you experiencing loss of taste or smell?",
                    question2_option4: "Are you experiencing slurred speech?",
                    question3_heading: "Do any of these describe<br /> your condition?",
                    question3_heading_sub: "Select all that apply. If none,<br /> proceed to the next screen.",
                    question3_option1: "Do you have difficulty waking up?",
                    question3_option2: "Are you experiencing dizziness or lightheadedness?",
                    question3_option3: "Have you in the past or currently being treated for cancer?",
                    question3_option4: "Have you been exposed to anyone with COVID-19?",
                    question4_heading: "Are you experiencing <br /> any of these symptoms?",
                    question4_heading_sub: " Select all that apply. If none,<br /> proceed to the next screen.",
                    question4_option1: "Do you have chest pain or tightness in your chest?",
                    question4_option2: "Are you experiencing vomiting or diarrhea?",
                    question4_option3: "Have you ever had an organ or bone marrow transplant?",
                    question5_heading: "In the last 14 days, have<br /> you been in an area where<br /> COVID-19 is widespread?",
                    question5_heading_sub: "Select all that apply. If none,<br /> proceed to the next screen.",
                    question5_option1: "Do you live in an area where COVID-19 is widespread?",
                    question5_option2: "Have you visited a nursing home in the last 14 days?",
                    question5_option3: "When did you last visit?",
                    question5_option4: "Where did you visit?",
                    question5_option5: "Have you traveled outside the US in the last 14 days?",
                    question5_option6: "When did you last visit?",
                    question5_option7: "Where did you visit?",
                    question5_you_visit: "When did you last visit?",
                    question5_last_visit: "Where did you visit?",
                    question6_heading: "We need to collect a little <br /> information about you",
                    question6_first_name: "First name",
                    question6_middle_name: "Middle name",
                    question6_last_name: "Last name",
                    question6_dob: "Date of Birth",
                    question6_month: "Month",
                    question6_day: "Day",
                    question6_year: "Year",
                    question6_secure: "All your personal information <br /> is encrypted and secure.",
                    question7_heading: "Tell us where you live?",
                    question7_address1: "Address 1",
                    question7_address2: "Address 2",
                    question7_country: "Country",
                    question7_city: "City",
                    question7_state: "State / Province",
                    question7_county: "County",
                    question7_zip: "Postal code",
                    question7_select_state: "Select State",
                    question8_heading: "Tell us about your <br /> background",
                    question8_ssn_label: "Last 4 digits of SSN",
                    question8_ssn_label_prod007: "Create 4 digit PIN",
                    question8_ssn_place: "Last 4 Social Security Number *** ** 0000",
                    question8_ssn_place_prod007: "Enter 4 digit PIN",
                    question8_gender_label: "Gender",
                    question8_gender_place: "Select Gender",
                    question8_race_label: "Race",
                    question8_race_place: "Select Race",
                    question8_ethnicity_label: "Ethnicity",
                    question8_ethnicity_place: "Select Ethnicity",
                    question8_dependent_btn: "Add a dependent",
                    question9_heading: "Insurance Information",
                    question9_heading_sub: "Do you have health insurance?",
                    question9_yes: "Yes",
                    question9_no: "No",
                    insurance_inp_heading: "Insurance Information",
                    insurance_inp_heading_sub: "You can find this information on <br />your insurance card.",
                    insurance_inp_insurance_name_label: "Insurance Name",
                    insurance_inp_insurance_name_place: "Enter Insurance name",
                    insurance_inp_pcn_place: "Enter PCN",
                    insurance_inp_policy_no_label: "Policy Number",
                    insurance_inp_policy_no_place: "Enter policy number",
                    insurance_inp_group_no_label: "Group Number",
                    insurance_inp_group_no_place: "Enter group number",
                    insurance_inp_bin_no_label: "BIN Number",
                    insurance_inp_bin_no_place: "Enter BIN number",
                    insurance_photo_heading: "Insurance Information",
                    insurance_photo_heading_sub: "Please take a photo of the front <br /> and back of your insurance card",
                    insurance_photo_tap: "Tap here",
                    insurance_photo_front_label: "Front of card",
                    insurance_photo_back_label: "Back of card",
                    insurance_review_heading: "Insurance Information",
                    insurance_review_heading_sub: "Please review both photos<br /> and make sure they are clear,<br /> legible and the most updated",
                    insurance_review_front_label: "Front of card",
                    insurance_review_back_label: "Back of card",
                    personalid_heading: "Personal ID",
                    personalid_heading_sub: "Please take a photo of a Personal ID: <br /> Front of Personal ID",
                    front_of_card_label: "Front of card",
                    back_of_card_label: "Back of card",
                    personalid_review_heading_sub: 'Please review both photos<br /> and make sure they are clear,<br /> legible and the most updated',
                    front_label: "Front",
                    back_label: "Back",
                    confirm_appointment: "Please confirm the date & time of <br />your appointment.",
                    schedule_appointment_heading: "Please choose a date and time <br /> to schedule your {{type}} appointment:",
                    schedule_appointment_select_day: "Select a day",
                    schedule_appointment_scroll_down: "Scroll down for more times",
                    schedule_appointment_select_time: "Select a time",
                    schedule_appointment_thank_you: "Thank you for booking <br />your appointment.",
                    schedule_appointment_datetime: "Test date and time",
                    schedule_appointment_add_to_calendar: "Add to Calendar",
                    schedule_appointment_test_location: "Test location",
                    schedule_appointment_next: "NEXT",
                    schedule_appointment_please_move: "Please move to the next<br /> station and present your<br /> Rapid Pass",
                    schedule_appointment_add_to: "Add to",
                    got_it_description: "Okay, this will be quick –<br className={{breakMobile}} /> we have a few questions <br className={{breakMobile}} /> about your health.<br className={{breakMobile}} /> <br className={{breakTablet}} /> Please have your driver’s license<br className={breakMobile} /> and insurance <br className={{breakTablet}} />card available <br className={{breakMobile}} /> before you start.<br className={{breakMobile}} /><br className={{breakTablet}} /> <br /> (All personal information you <br className={{breakMobile}} /> provide <br className={{breakTablet}} />is encrypted and secure.)<br />",
                    got_it_description_prod007: "Okay, this will be quick -<br className={{breakMobile}} /> We have a few questions <br /> to gather some personal details to set your appointment.<br className={{breakMobile}} /><br className={{breakTablet}} /> <br /> (All personal information you <br className={{breakMobile}} /> provide <br className={{breakTablet}} />is encrypted and secure.)<br />",
                    got_it_heading: "Got it",
                    dependent_heading: "Please provide <br /> dependent’s information",
                    dependent_first_name_label: "First name",
                    dependent_first_name_place: "First Name",
                    dependent_middle_name_label: "Middle name",
                    dependent_middle_name_place: "Middle name",
                    dependent_last_name_label: "Last name",
                    dependent_last_name_place: "Last name",
                    dependent_relationship_label: "Relationship",
                    dependent_relationship_place: "Enter Relationship",
                    dependent_dob_label: "Date of Birth",
                    dependent_month_label: "Month",
                    dependent_day_label: "Day",
                    dependent_year_label: "Year",
                    dependent_add_btn: "Add another dependent",
                    dependent_secure: "All your personal information <br /> is encrypted and secure.",
                    question10_heading: "COVID Attention of <br /> Uninsured Patients",
                    question10_description: "I do not have health care coverage<br /> such as individual, employer-sponsored, <br />Medicare or Medicaid coverage.<br /> Therefore I affirm and attest the above<br /> patient qualifies as Uninsured according<br /> to the COVID-19 Uninsured program<br /> in the Coronavirus Aid,  Relief and <br />Economic Security( CARES ) Act. ( P.L. 116-136)",
                    question10_clear_btn: "Clear Signature",
                    schedule_heading: "Please choose the one that <br /> best describes you:",
                    schedule_atlantis_hotel : "Atlantis Hotel <br /> GUEST",
                    schedule_atlantis_day : "Atlantis DAY PASS <br /> or Restaurant",
                    schedule_atlantis_ocean : "Ocean Club <br /> RESIDENT",
                    schedule_atlantis_vendor : "VENDOR",
                    guest_heading : "WELCOME!",
                    guest_heading_1 : "Which Tower are you <br /> staying in?",
                    guest_cove : "The Cove",
                    guest_reef : "The Reef",
                    guest_royal : "The Royal",
                    guest_harborside : "Harborside",

                    restaurant_heading: "Please choose the location <br /> you would like to test at:",
                    vendor_location_label: "Location",
                    restaurant_select_text: "Select a location",

                    vendor_heading : "Select Vendor Category",
                    vendor_same_label: "Vendor",
                    vendor_select_text: "Select a vendor",
                    vendor_type_name: "Type vendor name",

                    auth_heading : "HOW SHOULD WE <br /> CONTACT YOU?",
                    auth_sub_heading : "Please provide some contact <br /> information below",

                    signature007_heading : "Do you give consent for ATLANTIS <br /> to receive a copy of your <br /> test results?"

                }
            },
            es: {
                translations: {

                    loginHeading: "Ingrese correo electrónico y número de teléfono",
                    loginp1: "Necesitamos esta información para",
                    loginp2: "contactarlo para confirmar su cita de prueba",
                    loginp2_vaccine: "contactarlo para confirmar su cita de prueba",
                    loginp3: "y compartir de forma segura los resultados de las pruebas con usted",
                    loginp3_vaccine: "y compartir de forma segura la vacunación con usted.",
                    loginEnterEmail: "Ingrese su dirección de correo electrónico",
                    loginEnterPhone: "Ingrese su número telefónico",
                    loginEmailLabel: "Dirección de correo electrónico",
                    loginPhoneLabel: "Número de teléfono",
                    loginSubmitBtn: "Enviar",

                    welcomeHeading1: "Bienvenida a",
                    welcomeHeading2: "Asistente de programación",
                    welcomeList1: "Responda algunas preguntas sobre síntomas, viajes y contacto que haya tenido con otras personas.",
                    welcomeList2: "Sus respuestas no se compartirán con {{name}} u otros sin su permiso.",
                    welcomeTerm1: "Al utilizar esta herramienta, acepta sus términos y que {{name}} no será responsable de ningún daño relacionado con su uso.",
                    welcomeTerm2: "Las recomendaciones proporcionadas por esta herramienta no constituyen un consejo médico y no deben usarse para diagnosticar o tratar afecciones médicas.",
                    welcomeTermLabel: "Aceptar terminos y condiciones",
                    welcomeNextBtn: "Próxima",
                    question1_heading: "¿Tiene <br/> alguno de estos síntomas?",
                    question1_heading_sub: "Seleccione todas las que correspondan. Si no hay ninguno, <br /> proceda a la siguiente pantalla.",
                    question1_back: "atrás",
                    question1_next: "Próxima",
                    question1_option1: "Fiebre, escalofríos o sudoración",
                    question1_option2: "Si tiene fiebre, ¿cuál es su temperatura?",
                    question1_option3: "Dificultad para respirar (no grave)",
                    question1_option4: "Tos nueva o que empeora",
                    question1_option5: "¿Dolor de garganta?",
                    question2_heading: "¿Alguno de estos describe <br /> su condición?",
                    question2_heading_sub: "Seleccione todas las que correspondan. Si no hay ninguno, <br /> proceda a la siguiente pantalla.",
                    question2_option1: "¿Sufre de EPOC o asma?",
                    question2_option2: "¿Fumas?",
                    question2_option3: "¿Está experimentando pérdida del gusto o del olfato?",
                    question2_option4: "¿Tiene dificultad para hablar?",
                    question3_heading: "¿Alguno de estos describe <br /> su condición?",
                    question3_heading_sub: "Seleccione todas las que correspondan. Si no hay ninguno, <br /> proceda a la siguiente pantalla.",
                    question3_option1: "¿Tiene dificultad para despertarse?",
                    question3_option2: "¿Tiene mareos o aturdimiento?",
                    question3_option3: "¿Ha recibido tratamiento contra el cáncer en el pasado o actualmente?",
                    question3_option4: "¿Ha estado expuesto a alguien con COVID-19?",
                    question4_heading: "¿Tiene <br /> alguno de estos síntomas?",
                    question4_heading_sub: "Seleccione todas las que correspondan. Si no hay ninguno, <br /> proceda a la siguiente pantalla.",
                    question4_option1: "¿Tiene dolor en el pecho o opresión en el pecho?",
                    question4_option2: "¿Tiene vómitos o diarrea?",
                    question4_option3: "¿Ha tenido un trasplante de órgano o de médula ósea?",
                    question5_heading: "En los últimos 14 días, ¿ha estado <br /> en un área donde <br /> COVID-19 está muy extendido?",
                    question5_heading_sub: "Seleccione todas las que correspondan. Si no hay ninguno, <br /> proceda a la siguiente pantalla.",
                    question5_option1: "¿Vives en un área donde el COVID-19 está muy extendido?",
                    question5_option2: "¿Ha visitado un hogar de ancianos en los últimos 14 días?",
                    question5_option3: "¿Cuándo fue su última visita?",
                    question5_option4: "¿Qué lugar visitaste?",
                    question5_option5: "¿Ha viajado fuera de los Estados Unidos en los últimos 14 días?",
                    question5_option6: "¿Cuándo fue su última visita?",
                    question5_option7: "¿Qué lugar visitaste?",
                    question5_you_visit: "¿Cuándo fue su última visita?",
                    question5_last_visit: "¿Qué lugar visitaste?",
                    question6_heading: "Necesitamos recopilar un poco <br /> información sobre usted",
                    question6_first_name: "Primer nombre",
                    question6_middle_name: "Segundo nombre",
                    question6_last_name: "Apellido",
                    question6_dob: "Fecha de nacimiento",
                    question6_month: "Mes",
                    question6_day: "Día",
                    question6_year: "Año",
                    question6_secure: "Toda su información personal <br /> está encriptada y segura.",
                    question7_heading: "¿Dinos donde vives?",
                    question7_address1: "Dirección 1",
                    question7_address2: "Dirección 2",
                    question7_country: "País",
                    question7_city: "Ciudad",
                    question7_state: "Estado",
                    question7_county: "Condado",
                    question7_zip: "Código postal",
                    question7_select_state: "Seleccione estado",
                    question8_heading: "Cuéntenos acerca de su <br /> experiencia",
                    question8_ssn_label: "Los últimos 4 dígitos del número de Seguro Social",
                    question8_ssn_label_prod007: "Crear PIN de 4 dígitos",
                    question8_ssn_place: "Últimos 4 números de seguro social *** ** 0000",
                    question8_ssn_place_prod007: "Ingrese un PIN de 4 dígitos",
                    question8_gender_label: "Género",
                    question8_gender_place: "Seleccione género",
                    question8_race_label: "Raza",
                    question8_race_place: "Seleccionar raza",
                    question8_ethnicity_label: "Etnicidad",
                    question8_ethnicity_place: "Seleccionar origen étnico",
                    question8_dependent_btn: "Agregar un dependiente",
                    question9_heading: "Información del seguro",
                    question9_heading_sub: "¿Tienes seguro médico?",
                    question9_yes: "si",
                    question9_no: "No",
                    insurance_inp_heading: "Información del seguro",
                    insurance_inp_heading_sub: "Puede encontrar esta información en <br /> su tarjeta de seguro.",
                    insurance_inp_insurance_name_label: "Nombre del seguro",
                    insurance_inp_insurance_name_place: "Ingrese el nombre del seguro",
                    insurance_inp_pcn_place: "Ingrese PCN",
                    insurance_inp_policy_no_label: "Número de póliza",
                    insurance_inp_policy_no_place: "Ingrese el número de póliza",
                    insurance_inp_group_no_label: "Número de grupo",
                    insurance_inp_group_no_place: "Ingrese el número de grupo",
                    insurance_inp_bin_no_label: "Número de BIN",
                    insurance_inp_bin_no_place: "Ingrese el número de BIN",
                    insurance_photo_heading: "Información del seguro",
                    insurance_photo_heading_sub: "Tome una fotografía del <br /> anverso y reverso de su tarjeta de seguro.",
                    insurance_photo_tap: "Pulse aquí",
                    insurance_photo_front_label: "Anverso de la tarjeta",
                    insurance_photo_back_label: "Reverso de la tarjeta",
                    insurance_review_heading: "Información del seguro",
                    insurance_review_heading_sub: "Por favor revise ambas fotos <br /> y asegúrese de que sean claras, <br /> legibles y estén más actualizadas.",
                    insurance_review_front_label: "Anverso de la tarjeta",
                    insurance_review_back_label: "Reverso de la tarjeta",
                    personalid_heading: "Identificación Personal",
                    personalid_heading_sub: "Tome una foto de una identificación personal: <br /> Frente de la identificación personal",
                    front_of_card_label: "Anverso de la tarjeta",
                    back_of_card_label: "Reverso de la tarjeta",
                    personalid_review_heading_sub: 'Por favor revise ambas fotos <br /> y asegúrese de que sean claras, <br /> legibles y estén más actualizadas.',
                    front_label: "Delantera",
                    back_label: "atrás",
                    confirm_appointment: "Por favor confirme la fecha y hora de <br /> su cita.",
                    schedule_appointment_heading: "Elija una fecha y hora <br /> para programar su cita de {{type}}:",
                    schedule_appointment_select_day: "Seleccione un dia",
                    schedule_appointment_scroll_down: "Desplácese hacia abajo para ver más veces",
                    schedule_appointment_select_time: "Seleccione una hora",
                    schedule_appointment_thank_you: "Gracias por reservar <br /> su cita.",
                    schedule_appointment_datetime: "Prueba fecha y hora",
                    schedule_appointment_add_to_calendar: "Añadir al calendario",
                    schedule_appointment_test_location: "Lugar de prueba",
                    schedule_appointment_next: "SIGUIENTE",
                    schedule_appointment_please_move: "Vaya a la siguiente <br /> estación y presente su <br /> Rapid Pass",
                    schedule_appointment_add_to: "añadir",
                    got_it_description: "De acuerdo, esto será rápido. <br className={{breakMobile}} /> tenemos algunas preguntas <br className={{breakMobile}} /> sobre su salud. <br className={{breakMobile}} /> < br className = {{breakTablet}} /> Por favor, tenga su licencia de conducir <br className={breakMobile} /> y su tarjeta de seguro <br className={{breakTablet}} /> disponible <br className={{breakMobile}} /> antes de comenzar. <br className={{breakMobile}} /> <br className={{breakTablet}} /> <br /> (Toda la información personal que <br className={{breakMobile}} /> proporciona <br className = {{breakTablet}} /> está encriptado y es seguro.) <br />",
                    got_it_description_prod007: "De acuerdo, esto será rápido - <br className={{breakMobile}} /> Tenemos algunas preguntas <br /> para recopilar algunos detalles personales para programar su cita. <br className={{breakMobile}} /> <br className={{breakTablet}} /> <br /> (Toda la información personal que <br className={{breakMobile}} /> proporciona <br className = {{breakTablet}} /> está encriptado y es seguro.) <br />",
                    got_it_heading: "Entendido",
                    dependent_heading: "Proporcione <br /> información del dependiente",
                    dependent_first_name_label: "Primer nombre",
                    dependent_first_name_place: "Primer nombre",
                    dependent_middle_name_label: "Segundo nombre",
                    dependent_middle_name_place: "Segundo nombre",
                    dependent_last_name_label: "Apellido",
                    dependent_last_name_place: "Apellido",
                    dependent_relationship_label: "Relación",
                    dependent_relationship_place: "Ingrese relación",
                    dependent_dob_label: "Fecha de nacimiento",
                    dependent_month_label: "Mes",
                    dependent_day_label: "Día",
                    dependent_year_label: "Año",
                    dependent_add_btn: "Añadir otra dependiente",
                    dependent_secure: "Toda su información personal <br /> está encriptada y segura.",
                    question10_heading: "Atención COVID a <br /> pacientes sin seguro",
                    question10_description: "No tengo cobertura de salud <br /> tal como cobertura individual, patrocinada por el empleador, <br /> Medicare o Medicaid. <br /> Por lo tanto, afirmo y atestiguo que el <br /> paciente anterior califica como No asegurado según <br /> al programa COVID-19 para personas sin seguro <br /> en la Ley de <br /> Ayuda, Alivio y <br /> Seguridad Económica por Coronavirus (CARES). (P.L. 116-136)",
                    question10_clear_btn: "Firma clara",
                    schedule_heading: "Elija el que mejor <br /> le describa:",
                    schedule_atlantis_hotel : "Hotel Atlantis <br /> INVITADO",
                    schedule_atlantis_day : "Pase de un día o <br /> restaurante Atlantis",
                    schedule_atlantis_ocean : "Residente del <br /> Ocean Club",
                    schedule_atlantis_vendor : "VENDEDOR",

                    guest_heading : "¡BIENVENIDOS!",
                    guest_heading_1 : "¿En qué torre te alojas?",
                    guest_cove : "La cala",
                    guest_reef : "El arrecife",
                    guest_royal : "El Real",
                    guest_harborside : "Harbourside",

                    restaurant_heading: "Elija la ubicación en la que <br /> le gustaría realizar la prueba:",
                    vendor_location_label: "Localización",
                    restaurant_select_text: "Selecciona una ubicación",

                    vendor_heading : "Seleccionar categoría de proveedor",
                    vendor_same_label: "Vendedor",
                    vendor_select_text: "Seleccione un proveedor",
                    vendor_type_name: "Escriba el nombre del proveedor",

                    auth_heading : "¿Cómo deberíamos comunicarnos <br /> con usted?",
                    auth_sub_heading : "Proporcione información de <br /> contacto a continuación.",

                    signature007_heading : "¿Da su consentimiento para que ATLANTIS <br /> reciba una copia de los resultados <br /> de su prueba?"

                }
            }
        },
        fallbackLng: "en",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
