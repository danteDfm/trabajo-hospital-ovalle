"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cesfam = void 0;
const easy_soap_request_1 = __importDefault(require("easy-soap-request"));
//import fs from ("fs");
const xmlbuilder_1 = __importDefault(require("xmlbuilder"));
const xml_js_1 = __importDefault(require("xml-js"));
//import { resolve } from "path";
const url = "http://ws.fonasa.cl:8080/Certificados/Previsional";
const headers = {
    "user-agent": "sampleTest",
    "Content-Type": "text/xml;charset=UTF-8",
    "soapAction": "getCertificadoPrevisional"
};
class Cesfam {
    static api(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { run, dverificador } = req.body;
                run = run.split("-");
                let xml = xmlbuilder_1.default
                    .create("soapenv:Envelope")
                    .att("xmlns:soapenv", "http://schemas.xmlsoap.org/soap/envelope/")
                    .att("xmlns:cer", "http://certificadorprevisional.fonasa.gov.cl.ws/")
                    .ele("soapenv:Header").up()
                    .ele("soapenv:Body")
                    .ele("cer:getCertificadoPrevisional")
                    .ele("cer:query")
                    .ele("cer:queryTO")
                    .ele("cer:tipoEmisor", "10").up()
                    .ele("cer:tipoUsuario", "1").up().up()
                    .ele("cer:entidad", "61606407").up()
                    .ele("cer:claveEntidad", "6160").up()
                    .ele("cer:rutBeneficiario", `${run[0]}`).up()
                    .ele("cer:dgvBeneficiario", `${dverificador}`).up()
                    .ele("cer:canal", "1")
                    .end({ pretty: true });
                const response = yield (0, easy_soap_request_1.default)({ url: url, headers: headers, xml: xml });
                const responseXML = xml_js_1.default.xml2json(response.response.body);
                const parseXMLToJSON = JSON.parse(responseXML);
                const paciente = parseXMLToJSON.elements[0].elements[1].elements[0].elements[0].elements[9].elements;
                res.json({
                    run: `${paciente[0].elements[0].text}-${paciente[1].elements[0].text}`,
                    nombre: paciente[2].elements[0].text,
                    apellido_paterno: paciente[3].elements[0].text,
                    apellido_materno: paciente[4].elements[0].text,
                    fecha_nacimiento: paciente[5].elements[0].text
                });
            }
            catch (error) {
                res.json({
                    ok: false
                });
            }
        });
    }
}
exports.Cesfam = Cesfam;
