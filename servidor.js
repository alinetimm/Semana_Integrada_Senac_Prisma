const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const eventos = await prisma.evento.findMany({
            orderBy: { data: 'asc' },
        });
        res.json(eventos);
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        res.status(500).json({ error: 'Não foi possível buscar os eventos.' });
    }
});

// ROTA PARA INSCREVER UM ALUNO EM UM EVENTO
router.post('/:id/inscrever', async (req, res) => {
    try {
        const eventoId = parseInt(req.params.id);
        const { nomeAluno, emailAluno } = req.body;

        if (!nomeAluno || !emailAluno) {
            return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
        }

        const inscricaoExistente = await prisma.inscricao.findFirst({
            where: { eventoId, emailAluno },
        });

        if (inscricaoExistente) {
            return res.status(409).json({ error: 'Este e-mail já está inscrito no evento.' });
        }

        const novaInscricao = await prisma.inscricao.create({
            data: {
                nomeAluno,
                emailAluno,
                evento: { connect: { id: eventoId } },
            },
        });

        res.status(201).json(novaInscricao);

    } catch (error) {
        console.error("Erro ao criar inscrição:", error);
        res.status(500).json({ error: 'Não foi possível realizar a inscrição.' });
    }
});

module.exports = router;