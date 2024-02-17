import Link from "next/link";
import "./_contact.scss";

export const Contact = () => {
  return (
    <main>
      <section id="contact" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-12 wrapping">
              <div className="page-title">
                <p>Bizimlə əlaqə</p>
              </div>

              <div className="page-content">
                <div className="content">
                  <h4>Redaksiya ilə əlaqə</h4>
                  <p>
                    Telefon: <b>(+994) 12 599 12 19</b>
                  </p>
                  <p>
                    Mob: <b>(+994) 77 447 47 47</b>
                  </p>
                  <p>
                    E-mail:{" "}
                    <Link href="mailto:news@report.az">
                      <b>news@report.az</b>
                    </Link>
                  </p>
                </div>

                <div className="content">
                  <h4>Reklam üçün əlaqə</h4>
                  <p>
                    Mob: <b>(+994) 77 447 47 47</b>
                  </p>
                  <p>
                    E-mail: <b>pr@report.az</b>
                  </p>
                </div>
              </div>

              <div id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4248476433017!2d49.853904769622964!3d40.37727571118833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d077c61fef3%3A0xfa4594c97092ca01!2sAF%20Business%20House!5e0!3m2!1sen!2s!4v1646397077405!5m2!1sen!2s"
                  style={{ border: "0" }}
                  width="100%"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              <div className="contact-info">
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="chief-editor wrapping">
                      <h2 className="title">Direktor</h2>
                      <div className="info">
                        <span className="name">Fuad Hüseynəliyev </span>
                        <p>
                          <Link href="mailto:fuad.huseynaliyev@report.az">
                            fuad.huseynaliyev@report.az
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="chief-editor wrapping">
                      <h2 className="title">Baş redaktor</h2>
                      <div className="info">
                        <span className="name">Murad Əliyev</span>
                        <p>
                          <Link href="mailto:murad.aliyev@report.az">
                            murad.aliyev@report.az
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-9 col-md-8 col-sm-6">
                    <div className="departments">
                      <h2 className="title">Şöbələr</h2>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="department">
                            <p className="name">Daxili siyasət şöbəsi</p>
                            <ul>
                              <li>
                                <p>Redaktor:</p>
                                <p>
                                  <strong>İmdad Əlizadə</strong>
                                </p>
                              </li>
                              <li>
                                <p>E-mail:</p>
                                <p>
                                  <Link href="mailto:news@report.az">
                                    news@report.az
                                  </Link>
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="department">
                            <p className="name">İqtisadiyyat şöbəsi</p>
                            <ul>
                              <li>
                                <p>Baş redaktorun müavini:</p>
                                <p>
                                  <strong>İlahə Məmmədli</strong>
                                </p>
                              </li>
                              <li>
                                <p>E-mail:</p>
                                <p>
                                  <Link href="mailto:ilaha.mammadli@report.az">
                                    ilaha.mammadli@report.az
                                  </Link>
                                </p>
                              </li>
                            </ul>
                            <br />
                            <ul>
                              <li>
                                <p>Redaktor:</p>
                                <p>
                                  <strong>Namiq Hüseynov</strong>
                                </p>
                              </li>
                              <li>
                                <p>E-mail:</p>
                                <p>
                                  <Link href="mailto:economy@report.az">
                                    economy@report.az
                                  </Link>
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="department">
                            <p className="name">Xarici siyasət şöbəsi</p>
                            <ul>
                              <li>
                                <p>Baş redaktorun müavini:</p>
                                <p>
                                  <strong>Kəmalə Mustafayeva</strong>
                                </p>
                              </li>
                              <li>
                                <p>E-mail:</p>
                                <p>
                                  <Link href="mailto:kamalya.mustafayeva@report.az">
                                    kamalya.mustafayeva@report.az
                                  </Link>
                                </p>
                              </li>
                            </ul>
                            <br />
                            <ul>
                              <li>
                                <p>Redaktor:</p>
                                <p>
                                  <strong>
                                    Viktoriya Lebedyeva - Dementyeva
                                  </strong>
                                </p>
                              </li>
                              <li>
                                <p>E-mail:</p>
                                <p>
                                  <Link href="mailto:victoria@report.az">
                                    victoria@report.az
                                  </Link>
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
