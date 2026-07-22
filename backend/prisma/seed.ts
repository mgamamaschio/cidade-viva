import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const locations = [
    {
      name: 'Mirante da Ponte Estaiada',
      description: 'Mirante com vista panorâmica para o Rio Tietê e a cidade de Salto.',
      category: 'Mirante',
      address: 'Rodovia da Convenção, 3 Salto de São José, Salto - SP',
      latitude: -23.21039,
      longitude: -47.29397,
      accessibilityFeatures: ['Entrada acessível', 'Vaga reservada'],
    },
    {
      name: 'Complexo Turístico da Cachoeira do Salto',
      description: 'Principal complexo turístico de Salto, com vista para a Cachoeira do Rio Tietê.',
      category: 'Ponto Turístico',
      address: 'Rua Nove de Julho, s/n, Centro, Salto - SP, CEP 13320-200',
      latitude: -23.2005,
      longitude: -47.2865,
      accessibilityFeatures: ['Entrada acessível', 'Banheiro adaptado', 'Piso tátil'],
    },
    {
      name: 'Parque Rocha Moutonnée',
      description: 'Parque geológico que abriga uma rara formação rochosa de origem glacial.',
      category: 'Parque',
      address: 'Rodovia Rocha Moutonnée, 5500, Salto de São José, Salto - SP',
      latitude: -23.205,
      longitude: -47.29,
      accessibilityFeatures: ['Entrada acessível', 'Ambiente tranquilo'],
    },
    {
      name: 'Drogasil',
      description: 'Farmácia com medicamentos, produtos de saúde, higiene e conveniência.',
      category: 'Farmácia',
      address: 'Rua Nove de Julho, 321, Vila Nova, Salto - SP, CEP 13322-000',
      latitude: -23.201,
      longitude: -47.287,
      accessibilityFeatures: ['Entrada acessível', 'Vaga reservada'],
    },
    {
      name: 'Orgânicos Oficina da Terra',
      description: 'Cafeteria e restaurante com foco em alimentação natural e produtos orgânicos.',
      category: 'Cafeteria',
      address: 'Avenida João Jabur, 401, Salto - SP, CEP 13329-203',
      latitude: -23.19464,
      longitude: -47.28853,
      accessibilityFeatures: ['Entrada acessível', 'Banheiro adaptado', 'Aceita cão-guia'],
    },
  ];

  for (const location of locations) {
    await prisma.location.create({ data: location });
  }

  console.log(`${locations.length} locais cadastrados com sucesso.`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());