import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ComponentStatus } from '../../../interfaces/ComponentStatus';

export interface GenerateHtmlData {
    id: string;
    userId: string;
    workloadId?: string;
    status: ComponentStatus;
    code: string;
    name: string;
    department: string;
    modality: string;
    program: string;
    semester: string;
    prerequeriments: string;
    methodology: string;
    objective: string;
    syllabus: string;
    learningAssessment: string;
    bibliography: string;
    workload?: {
        student: {
            theory?: number;
            practice?: number;
            theoryPractice?: number;
            internship?: number;
            practiceInternship?: number;
        };
        professor: {
            theory?: number;
            practice?: number;
            theoryPractice?: number;
            internship?: number;
            practiceInternship?: number;
        };
        module: {
            theory?: number;
            practice?: number;
            theoryPractice?: number;
            internship?: number;
            practiceInternship?: number;
        }
    };
}

export function generateHtml(data: GenerateHtmlData) {
    const { workload } = data;
    return renderToStaticMarkup(
        <html>
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Componente Curricular</title>
                <style>
                    {`
                        html, body, div, span, applet, object, iframe,
                        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
                        a, abbr, acronym, address, big, cite, code,
                        del, dfn, em, img, ins, kbd, q, s, samp,
                        small, strike, strong, sub, sup, tt, var,
                        b, u, i, center,
                        dl, dt, dd, ol, ul, li,
                        fieldset, form, label, legend,
                        table, caption, tbody, tfoot, thead, tr, th, td,
                        article, aside, canvas, details, embed,
                        figure, figcaption, footer, header, hgroup,
                        menu, nav, output, ruby, section, summary,
                        time, mark, audio, video {
                        margin: 0;
                            padding: 0;
                            border: 0;
                            font-size: 100%;
                            font: inherit;
                            vertical-align: baseline;
                        }

                        :focus {
                            outline: 0;
                        }
                        article, aside, details, figcaption, figure,
                        footer, header, hgroup, menu, nav, section {
                            display: block;
                        }

                        body {
                            line-height: 1;
                        }

                        blockquote, q {
                            quotes: none;
                        }

                        blockquote:before, blockquote:after,
                        q:before, q:after {
                            content: '';
                            content: none;
                        }

                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }

                        [hidden] {
                            display: none;
                        }

                        html {
                            font-size: 100%; /* 1 */
                            -webkit-text-size-adjust: 100%; /* 2 */
                            -ms-text-size-adjust: 100%; /* 2 */
                        }

                        img {
                            border: 0; /* 1 */
                            -ms-interpolation-mode: bicubic; /* 2 */
                        }

                        button,
                        html input[type="button"], /* 1 */
                        input[type="reset"],
                        input[type="submit"] {
                            -webkit-appearance: button; /* 2 */
                            cursor: pointer; /* 3 */
                            *overflow: visible;  /* 4 */
                        }

                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }

                        html,
                        button,
                        input,
                        select,
                        textarea {
                            color: #222;
                        }


                        ::-moz-selection {
                            background: #b3d4fc;
                            text-shadow: none;
                        }

                        ::selection {
                            background: #b3d4fc;
                            text-shadow: none;
                        }

                        img {
                            vertical-align: middle;
                        }

                        .chromeframe {
                            margin: 0.2em 0;
                            background: #ccc;
                            color: #000;
                            padding: 0.2em 0;
                        }

                        /*

                        MAIN CSS BELOW

                        */

                        body {
                            margin: 2rem;
                            padding-top: 2rem;
                            max-width: 100vw;
                            height: 100vh;
                            font-family: Arial, Verdana, Helvetica, sans-serif;
                        }

                        header {
                            display: flex;
                            align-items: center;
                            gap: 2rem;
                            width: 100%;
                            height: 8rem;
                        }

                        h3 {
                            font-size: 1.3rem;
                        }

                        .logo-container {
                            border-top: 1px solid black;
                            border-bottom: 1px solid black;
                            height: 100%;
                            width: 8rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .logo-container img {
                            width: 5rem;
                            height: 7rem;
                            margin: auto;
                        }

                        .header-info p {
                            font-size: 1rem;
                        }
                        .header-info {
                            border-top: 1px solid black;
                            border-bottom: 1px solid black;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                        }

                        .header-title, .header-content {
                            display: flex;
                            flex-direction: column;
                            gap: 0.5rem;
                        }

                        .title {
                            background-color: #d4d4d4;
                            width: 100%;
                            height: 6rem;
                            margin-top: 2rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .title h1 {
                            font-size: 1.4rem;
                            text-align: center;
                            font-weight: bold;
                        }

                        .idetification {
                            margin-top: 2rem;
                            width: 100%;
                            height: 3rem;
                            border-top: 2px solid black;
                            border-bottom: 3px solid black;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .idetification div {
                            border-top: 3px solid black;
                            border-bottom: 2px solid black;
                            width: 100%;
                            height: 70%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .idetification span {
                            font-size: 1.1rem;
                            margin: auto;
                        }

                        .class-info {
                            width: 100%;
                            height: 8rem;
                            margin-top: 0.6rem;
                            display: flex;
                            gap: 2.5rem;
                        }

                        .class-code {
                            flex: 1;
                            width: 100%;
                            height: 100%;
                            border-bottom: 1px solid black;
                        }
                        .class-name {
                            flex: 4;
                            width: 100%;
                            height: 100%;
                            border-bottom: 1px solid black;
                        }
                        .class-department {
                            flex: 3;
                            width: 100%;
                            height: 100%;
                            border-bottom: 1px solid black;
                        }

                        .class-header {
                            border-top: 1px solid black;
                            border-bottom: 1px solid black;
                            padding-top: 0.4rem;
                            font-weight: 700;
                        }
                        .class-header2 {
                            border-top: 1px solid black;
                            border-bottom: 1px solid black;
                            padding-top: 0.4rem;
                            font-weight: 400;
                        }

                        .class-header2 h4 {
                            font-size: 0.9rem;
                            font-weight: 500;
                        }

                        .workload-section {
                            margin-top: 1rem;
                            display: grid;
                            grid-template-columns: 1.2fr 0.8fr 1.2fr;
                            column-gap: 1.2rem;
                            row-gap: 1.2rem;
                            grid-auto-rows: minmax(4rem, auto);
                            width: 100%;
                        }

                        .workload {
                            width: 100%;
                            height: 100%;
                        }
                        .type {
                            width: 100%;
                            border-bottom: 1px solid black;
                        }
                        .pre-requirement {
                            width: 100%;
                            border-bottom: 1px solid black;
                        }

                        .table-container {
                            width: 100%;
                        }

                        table {
                            width: 100%;
                            border-bottom: 1px solid black;
                        }

                        table th {
                            border-bottom: 1px solid black;
                            border-right: 1px solid black;
                            border-collapse: collapse;
                            width: 10%;
                            padding-top: 0.2rem;
                        }

                        table td {
                            padding-top: 0.3rem;
                            border-right: 1px solid black;
                            width: 10%;
                        }

                        table td:last-child, th:last-child {
                            border-right: none;
                            width: 30%;
                        }

                        .table-workload td:last-child, th:last-child {
                            border-right: none;
                            width: 10%;
                        }

                        table tbody tr {
                            height: 4rem;
                        }

                        table thead,tbody {
                            text-align: center;
                        }

                        .section-info {
                            width: 100%;
                        }

                        .section-title {
                            margin-top: 2rem;
                            padding: 0.3rem;
                            text-align: center;
                            border-top: double black;
                            border-bottom: double black;
                        }

                        .section-title span {
                            font-size: 1.1rem;
                            font-weight: 700;
                        }

                        .center {
                            text-align: center;
                        }
                        .content {
                            padding: 0.4rem;
                        }
                        .red {
                            color: red;
                        }
                        .xl {
                            font-size: 1rem;
                        }
                        .content {
                            text-align: justify;
                            text-justify: inter-word;
                            padding: 0.4rem 0.2rem 0.2rem 0.2rem;
                        }

                    `}
                </style>
            </head>
            <body>
                <header>
                    <div className="logo-container">
                        <img src="data:image/jpeg;base64,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" alt="Logo Ufba" />
                    </div>
                    <div className="header-info">
                        <div className="header-title">
                            <h3>UNIVERSIDADE FEDERAL DA BAHIA</h3>
                            <h3>PRÓ-REITORIA DE ENSINO DE GRADUAÇÃO</h3>
                        </div>
                        <div className="header-content">
                            <p>Coordenação Acadêmica</p>
                            <p>Núcleo de Currículos e Programas</p>
                        </div>
                    </div>
                </header>
                <section className="title">
                    <h1>PLANEJAMENTO DE ENSINO-APRENDIZAGEM DE COMPONENTE CURRICULAR - SEMESTRAL</h1>
                </section>
                <section className="idetification">
                    <div>
                        <span>IDENTIFICAÇÃO</span>
                    </div>
                </section>
                <section className="class-info">
                    <div className="class-code">
                        <div className="class-header2">
                            <h4 className="center">CÓDIGO</h4>
                        </div>
                        <div className="content center">
                            <p>{ data.code }</p>
                        </div>
                    </div>
                    <div className="class-name">
                        <div className="class-header2">
                            <h4>NOME</h4>
                        </div>
                        <div className="content center">
                            <p>{ data.name }</p>
                        </div>
                    </div>
                    <div className="class-department">
                        <div className="class-header2">
                            <h4>DEPARTAMENTO OU EQUIVALENTE</h4>
                        </div>
                        <div className="content center">
                            <p>{ data.department }</p>
                        </div>
                    </div>
                </section>
                <section className="workload-section">
                    <div className="workload">
                        <div className="class-header">
                            <h4 className="center xl">CARGA HORÁRIA (estudante)</h4>
                        </div>
                        <div className="table-container">
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>T</th>
                                        <th>P</th>
                                        <th>T/P</th>
                                        <th>PE</th>
                                        <th>E</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{ workload?.student.theory }</td>
                                        <td>{ workload?.student.practice }</td>
                                        <td>{ workload?.student.theoryPractice }</td>
                                        <td>{ workload?.student.practiceInternship }</td>
                                        <td>{ workload?.student.internship }</td>
                                        <td>{ workload ? Object.values(workload.student).reduce((p, c) => p + c, 0 ) : 0 }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="type">
                        <div className="class-header">
                            <h4 className="center xl">MODALIDADE</h4>
                        </div>
                        <div className='content'>
                            <p>{ data.modality }</p>
                        </div>
                    </div>
                    <div className="pre-requirement">
                        <div className="class-header">
                            <h4 className="center xl">PRÉ-REQUISITO (POR CURSO)</h4>
                        </div>
                        <div className='content'>
                            <p>{ data.prerequeriments }</p>
                        </div>
                    </div>
                    <div className="workload">
                        <div className="class-header">
                            <h4 className="center xl">CARGA HORÁRIA (docente)</h4>
                        </div>
                        <div className="table-container">
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>T</th>
                                        <th>P</th>
                                        <th>T/P</th>
                                        <th>PE</th>
                                        <th>E</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{ workload?.professor.theory }</td>
                                        <td>{ workload?.professor.practice }</td>
                                        <td>{ workload?.professor.theoryPractice }</td>
                                        <td>{ workload?.professor.practiceInternship }</td>
                                        <td>{ workload?.professor.internship }</td>
                                        <td>{ workload ? Object.values(workload.professor).reduce((p, c) => p + c, 0 ) : 0 }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="workload">
                        <div className="class-header">
                            <h4 className="center xl">MÓDULO</h4>
                        </div>
                        <div className="table-container">
                            <table className="table-workload">
                                <thead>
                                    <tr>
                                        <th>T</th>
                                        <th>P</th>
                                        <th>T/P</th>
                                        <th>PE</th>
                                        <th>E</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{ workload?.professor.theory }</td>
                                        <td>{ workload?.professor.practice }</td>
                                        <td>{ workload?.professor.theoryPractice }</td>
                                        <td>{ workload?.professor.practiceInternship }</td>
                                        <td>{ workload?.professor.internship }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pre-requirement">
                        <div className="class-header">
                            <h4 className="center xl">SEMESTRE LETIVO DE APLICAÇÃO</h4>
                        </div>
                        <div className='content'>
                            <p>{ data.semester }</p>
                        </div>
                    </div>
                </section>
                <section className="section-info">
                    <div className="section-title">
                        <span>EMENTA</span>
                    </div>
                    <div className='content'>
                        <p>{ data.syllabus || 'Conteúdo não cadastrado' }</p>
                    </div>
                </section>
                <section className="section-info">
                    <div className="section-title">
                        <span>OBJETIVOS</span>
                    </div>
                    <div className='content'>
                        <p>{ data.objective || 'Conteúdo não cadastrado' }</p>
                    </div>
                </section>
                <section className="section-info">
                    <div className="section-title">
                        <span>CONTEÚDO PROGRAMÁTICO</span>
                    </div>
                    <div className='content'>
                        <p>{ data.program || 'Conteúdo não cadastrado' }</p>
                    </div>
                </section>
                <section className="section-info">
                    <div className="section-title">
                        <span>METODOLOGIA</span>
                    </div>
                    <div className='content'>
                        <p>{ data.methodology || 'Conteúdo não cadastrado' }</p>
                    </div>
                </section>
                <section className="section-info">
                    <div className="section-title">
                        <span>AVALIAÇÃO DA APRENDIZAGEM</span>
                    </div>
                    <div className='content'>
                        <p>{ data.learningAssessment || 'Conteúdo não cadastrado' }</p>
                    </div>
                </section>
                <section className="section-info">
                    <div className="section-title">
                        <span>BIBLIOGRAFIA</span>
                    </div>
                    <div className='content'>
                        <p>{ data.bibliography || 'Conteúdo não cadastrado' }</p>
                    </div>
                </section>
            </body>
        </html>
    );
}
