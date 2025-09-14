const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const eventosData = [
    { titulo: 'Abertura', tipo: 'Abertura', tema: 'Evento livre', data: new Date('2025-09-17T13:30:00'), horaInicio: '13:30:00', horaFim: '14:00:00', local: 'Labin 204', palestrante: null },
    { titulo: 'Mini curso sobre Desenvolvimento de jogos', tipo: 'Mini curso', tema: 'Modelagem de jogos', data: new Date('2025-09-17T13:30:00'), horaInicio: '13:30:00', horaFim: '17:30:00', local: 'Labin 204', palestrante: 'Pedro Lobato' },
    { titulo: 'Tailwind.css', tipo: 'Mini curso', tema: 'Design', data: new Date('2025-09-17T13:30:00'), horaInicio: '13:30:00', horaFim: '17:30:00', local: 'Multi 202', palestrante: 'Bruna Ribeiro' },
    { titulo: 'Abertura', tipo: 'Abertura', tema: 'Evento livre', data: new Date('2025-09-17T19:00:00'), horaInicio: '19:00:00', horaFim: '19:30:00', local: 'Sala 204', palestrante: null },
    { titulo: 'Palestra sobre cyber segurança', tipo: 'Palestra', tema: 'Cyber segurança', data: new Date('2025-09-17T19:30:00'), horaInicio: '19:30:00', horaFim: '20:30:00', local: 'Sala 204', palestrante: 'João Pedro Moreira' },
    { titulo: 'Projetos Integradores TDS 2024', tipo: 'Painel', tema: 'Evento livre', data: new Date('2025-09-17T20:45:00'), horaInicio: '20:45:00', horaFim: '21:30:00', local: 'Sala 204', palestrante: 'Alunos TDS' },
    { titulo: 'Robótica/IOT', tipo: 'Mini curso', tema: 'Robótica', data: new Date('2025-09-18T14:00:00'), horaInicio: '14:00:00', horaFim: '15:00:00', local: 'Labin 204', palestrante: 'Gladimir' },
    { titulo: 'Painel Mercado de trabalho (Tarde)', tipo: 'Painel', tema: 'Mercado de trabalho', data: new Date('2025-09-18T15:30:00'), horaInicio: '15:30:00', horaFim: '16:30:00', local: 'Multi 202', palestrante: 'Beatriz Gioielli, Verônica Schiller e Rosâni Ribeiro' },
    { titulo: 'Workshop sobre IA com o Pablo', tipo: 'Workshop', tema: 'IA', data: new Date('2025-09-18T16:30:00'), horaInicio: '16:30:00', horaFim: '17:30:00', local: 'Labin 204', palestrante: 'Pablo Rosa' },
    { titulo: 'Painel Mercado de trabalho (Noite)', tipo: 'Painel', tema: 'Mercado de trabalho', data: new Date('2025-09-18T19:00:00'), horaInicio: '19:00:00', horaFim: '20:30:00', local: 'Sala 202', palestrante: 'Mauro Lages e Alexsandro Ayres Coelho' },
    { titulo: 'Workshop sobre IA com Kristofer Kappel', tipo: 'Workshop', tema: 'IA', data: new Date('2025-09-18T20:45:00'), horaInicio: '20:45:00', horaFim: '21:45:00', local: 'Sala 202', palestrante: 'Kristofer Kappel' },
    { titulo: 'Hackaton!', tipo: 'Hackaton', tema: 'Evento livre', data: new Date('2025-09-19T13:30:00'), horaInicio: '13:30:00', horaFim: '20:30:00', local: 'labin 101, 102 e 201', palestrante: 'Alunos TDS' },
    { titulo: 'Encerramento', tipo: 'Encerramento', tema: 'Evento livre', data: new Date('2025-09-19T20:30:00'), horaInicio: '20:30:00', horaFim: '22:00:00', local: 'Prédio Tech', palestrante: null },
];

async function main() {
    console.log(`Iniciando o seed...`);
    // Limpa tabelas existentes para evitar duplicatas
    await prisma.inscricao.deleteMany();
    await prisma.evento.deleteMany();

    for (const evento of eventosData) {
        const novoEvento = await prisma.evento.create({
            data: evento,
        });
        console.log(`Criado evento com id: ${novoEvento.id}`);
    }
    console.log(`Seed finalizado.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
