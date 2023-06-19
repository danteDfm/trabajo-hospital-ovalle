import { Request, Response } from "express";
import soapRequest from "easy-soap-request";
//import fs from ("fs");
import xmlBuilder from "xmlbuilder";
import convert from "xml-js";
//import { resolve } from "path";

const url = "http://ws.fonasa.cl:8080/Certificados/Previsional";
const headers = {
  "user-agent": "sampleTest",
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: "getCertificadoPrevisional",
};

export class Cesfam {
  static async api(req: Request, res: Response) {
    try {
      let { run, dverificador } = req.body;

      run = run.split("-");

      let xml = xmlBuilder
        .create("soapenv:Envelope")
        .att("xmlns:soapenv", "http://schemas.xmlsoap.org/soap/envelope/")
        .att("xmlns:cer", "http://certificadorprevisional.fonasa.gov.cl.ws/")
        .ele("soapenv:Header")
        .up()
        .ele("soapenv:Body")
        .ele("cer:getCertificadoPrevisional")
        .ele("cer:query")
        .ele("cer:queryTO")
        .ele("cer:tipoEmisor", "10")
        .up()
        .ele("cer:tipoUsuario", "1")
        .up()
        .up()
        .ele("cer:entidad", "61606407")
        .up()
        .ele("cer:claveEntidad", "6160")
        .up()
        .ele("cer:rutBeneficiario", `${run[0]}`)
        .up()
        .ele("cer:dgvBeneficiario", `${dverificador}`)
        .up()
        .ele("cer:canal", "1")
        .end({ pretty: true });

      const response = await soapRequest({
        url: url,
        headers: headers,
        xml: xml,
      });
      const responseXML = convert.xml2json(response.response.body);
      const parseXMLToJSON = JSON.parse(responseXML);
      const paciente =
        parseXMLToJSON.elements[0].elements[1].elements[0].elements[0]
          .elements[9].elements;

      res.json({
        run: `${paciente[0].elements[0].text}-${paciente[1].elements[0].text}`,
        nombre: paciente[2].elements[0].text,
        apellido_paterno: paciente[3].elements[0].text,
        apellido_materno: paciente[4].elements[0].text,
        fecha_nacimiento: paciente[5].elements[0].text,
      });
    } catch (error) {
      res.json({
        ok: false,
      });
    }
  }
}
