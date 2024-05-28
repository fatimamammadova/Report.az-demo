import Image from "next/image";

export const generateMetadata = () => {
  return {
    title: "Haqqımızda",
  };
};

const About = () => {
  return (
    <main>
      <section id="about" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-12 wrapping">
              <div className="page-title">
                <p>Haqqımızda</p>
              </div>
              <div className="about-content">
                <p>
                  “Report” İnformasiya Agentliyi 2014-cü ildən fəaliyyətə
                  başlayıb. “Global Media Group” holdinqin tərkibinə daxildir.
                </p>

                <h3>Şirkətimizin siyasəti</h3>

                <strong>
                  KEYFİYYƏT, ƏMƏYİN VƏ ƏTRAF MÜHİTİN MÜHAFİZƏSİ ÜZRƏ SİYASƏT
                </strong>

                <p>
                  Azərbaycan Respublikasında fəaliyyət göstərən operativ və
                  dəqiq məlulmatın təmin edilməsi ilə seçilən «Report
                  İnformasiya Agentliyi» MMC bir informasiya agentliyidir.
                  «Report İnformasiya Agentliyi» MMC olaraq fəaliyyət sahəmizdə
                  ətraf mühitin qorunması və əməyin təhlükəsizliyi önəmli yer
                  tutur.
                </p>

                <p>
                  «Report İnformasiya Agentliyi» MMCkeyfiyyət, əməyin
                  təhlükəsizliyi və ətraf mühitin mühafizəsi sahəsində aşağıdakı
                  əsas prinsipləri rəhbər tutur:
                </p>

                <ul>
                  <li>
                    Beynəlxalq standartların tələblərinə uyğunluğun təmin
                    edilməsi
                  </li>
                  <li>
                    Müasir metodikalardan istifadə etməklə, yüksək keyfiyyətli,
                    təhlükəsiz və tələblərə uyğun xidmətin vaxtında təmin
                    edilməsi və müştəri məmnunluğunun qazanılmasını;
                  </li>
                  <li>
                    Xidmət və ya məhsulun idarəolunması, planlaşdırma və
                    monitorinq metodlarının təkmilləşdirilməsini,
                    infrastrukturun yaxşılaşdırılmasını;
                  </li>
                  <li>
                    Bazarın dəyişikliklərinə çevik uyğunlaşmanın təmin
                    olunmasını və rəqabət qabiliyyətliliyinin artırılmasını;
                  </li>
                  <li>
                    Personalın səriştəliliyinin, təhlükəsizliyinin və qərarların
                    qəbulunda iştirakının təminini;
                  </li>
                  <li>Fəaliyyətdə risk və proses yanaşmasının tətbiqi;</li>
                  <li>
                    Təchizatçılarlar uzunmüddətli və səmərəli münasibətlərin
                    formalaşdırılmasını;
                  </li>
                  <li>
                    Fəaliyyət çərçivəsində yerli qanunvericiliyin tələblərinə
                    riayət edilməsini;
                  </li>
                  <li>
                    Əməyin təhlükəsizliyi və ətraf mühitə təsir amillərinin
                    idarəolunmasını;
                  </li>
                  <li>
                    İstehlakçıların məmnunluğunun və təhlükəsizliyinin təmin
                    olunması idarəetmənin təkmilləşdirilməsini;
                  </li>
                  <li>IMS–nin daimi təkmilləşdirilməsini.</li>
                </ul>

                <p>
                  <Image
                    src="/images/iso_logo.svg"
                    alt="Iso Logo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    priority="true"
                    style={{ maxWidth: "100%", height: "auto", width: "400px" }}
                  />
                </p>
                <p>
                  27.12.2022-ci il tarixində, "Report.az" xəbər saytı İSO-9001,
                  İSO-14001, İSO-45001 beynəlxalq sertifikatlarına layiq
                  görülmüşdür.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
