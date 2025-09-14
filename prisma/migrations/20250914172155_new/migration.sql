-- CreateTable
CREATE TABLE `Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `horaInicio` VARCHAR(191) NOT NULL,
    `horaFim` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,
    `palestrante` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscricao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeAluno` VARCHAR(191) NOT NULL,
    `emailAluno` VARCHAR(191) NOT NULL,
    `eventoId` INTEGER NOT NULL,

    UNIQUE INDEX `Inscricao_eventoId_emailAluno_key`(`eventoId`, `emailAluno`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inscricao` ADD CONSTRAINT `Inscricao_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
