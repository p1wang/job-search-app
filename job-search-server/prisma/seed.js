import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import fs from "fs";
import { promises } from "dns";

const prisma = new PrismaClient();

async function main() {
  // custom function to generate IDs for clearDB
  function generateRandomId() {
    return faker.datatype.number({ min: 0, max: 990, precision: 10 }) + 4;
  }

  // generate users
  async function generateUsers() {
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
      });
    }

    await prisma.user.createMany({
      data: users,
    });
  }

  // generate companies
  async function generateCompanies() {
    const companies = [];
    for (let i = 0; i < 100; i++) {
      companies.push({
        name: faker.company.name(),
        streetAddress: faker.address.streetAddress(),
        city: faker.address.city(),
        province: faker.address.state(),
        postalCode: faker.address.zipCode(),
        country: faker.address.country(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        website: faker.internet.url(),
      });
    }

    await prisma.company.createMany({
      data: companies,
    });
  }

  // generate jobs
  async function generateJobs() {
    const jobs = [];
    for (let i = 0; i < 100; i++) {
      jobs.push({
        title: faker.name.jobTitle(),
        description: faker.lorem.paragraph(5),
        companyId: generateRandomId(),
      });
    }

    await prisma.job.createMany({
      data: jobs,
    });
  }

  // generate applications
  async function generateApplications() {
    const usedCombinations = new Set();
    const applications = [];
    for (let i = 0; i < 100; i++) {
      let userId = 4,
        jobId = 4;

      while (usedCombinations.has(`${userId}-${jobId}`)) {
        userId = generateRandomId();
        jobId = generateRandomId();
      }
      usedCombinations.add(`${userId}-${jobId}`);

      applications.push({
        userId: userId,
        jobId: jobId,
      });
    }

    await prisma.application.createMany({
      data: applications,
    });
  }

  // generate industries
  async function generateIndustries() {
    const industry = await prisma.industry.createMany({
      data: industries.map((industry) => ({
        title: industry,
      })),
    });
  }

  // generate userJob
  async function generateUserJob() {
    const usedCombinations = new Set();
    const userJob = [];

    for (let i = 0; i < 100; i++) {
      let userId = 4,
        jobId = 4;

      while (usedCombinations.has(`${userId}-${jobId}`)) {
        userId = generateRandomId();
        jobId = generateRandomId();
      }
      usedCombinations.add(`${userId}-${jobId}`);

      userJob.push({
        userId: userId,
        jobId: jobId,
      });
    }

    await prisma.userJob.createMany({
      data: userJob,
    });
  }

  // generate skills
  async function generateSkills() {
    const skills = [];
    for (let i = 0; i < 100; i++) {
      skills.push({
        title: faker.lorem.word(),
        level: faker.helpers.arrayElement([
          "Beginner",
          "Intermediate",
          "Advanced",
        ]),
        applicationId: generateRandomId(),
      });
    }

    await prisma.skill.createMany({
      data: skills,
    });
  }

  // generate experiences
  async function generateExperiences() {
    const experiences = [];
    for (let i = 0; i < 100; i++) {
      experiences.push({
        title: faker.lorem.word(),
        company: faker.company.name(),
        description: faker.lorem.paragraph(1),
        startDate: faker.date.past(),
        endDate: faker.date.past(),
        applicationId: generateRandomId(),
      });
    }

    await prisma.experience.createMany({
      data: experiences,
    });
  }

  // generate educations
  async function generateEducations() {
    const educations = [];
    for (let i = 0; i < 100; i++) {
      educations.push({
        school: faker.name.lastName() + " University",
        degree: faker.lorem.word(),
        startDate: faker.date.past(),
        endDate: faker.date.past(),
        applicationId: generateRandomId(),
      });
    }

    await prisma.education.createMany({
      data: educations,
    });
  }

  await generateUsers();
  await generateCompanies();
  await generateJobs();
  await generateApplications();
  await generateIndustries();
  await generateUserJob();
  await generateSkills();
  await generateExperiences();
  await generateEducations();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const industries = [
  "Accounting",
  "Airlines/Aviation",
  "Alternative Dispute Resolution",
  "Alternative Medicine",
  "Animation",
  "Apparel & Fashion",
  "Architecture & Planning",
  "Arts & Crafts",
  "Automotive",
  "Aviation & Aerospace",
  "Banking",
  "Biotechnology",
  "Broadcast Media",
  "Building Materials",
  "Business Supplies & Equipment",
  "Capital Markets",
  "Chemicals",
  "Civic & Social Organization",
  "Civil Engineering",
  "Commercial Real Estate",
  "Computer & Network Security",
  "Computer Games",
  "Computer Hardware",
  "Computer Networking",
  "Computer Software",
  "Construction",
  "Consumer Electronics",
  "Consumer Goods",
  "Consumer Services",
  "Cosmetics",
  "Dairy",
  "Defense & Space",
  "Design",
  "Education Management",
  "E-learning",
  "Electrical & Electronic Manufacturing",
  "Entertainment",
  "Environmental Services",
  "Events Services",
  "Executive Office",
  "Facilities Services",
  "Farming",
  "Financial Services",
  "Fine Art",
  "Fishery",
  "Food & Beverages",
  "Food Production",
  "Fundraising",
  "Furniture",
  "Gambling & Casinos",
  "Glass, Ceramics & Concrete",
  "Government Administration",
  "Government Relations",
  "Graphic Design",
  "Health, Wellness & Fitness",
  "Higher Education",
  "Hospital & Health Care",
  "Hospitality",
  "Human Resources",
  "Import & Export",
  "Individual & Family Services",
  "Industrial Automation",
  "Information Services",
  "Information Technology & Services",
  "Insurance",
  "International Affairs",
  "International Trade & Development",
  "Internet",
  "Investment Banking/Venture",
  "Investment Management",
  "Judiciary",
  "Law Enforcement",
  "Law Practice",
  "Legal Services",
  "Legislative Office",
  "Leisure & Travel",
  "Libraries",
  "Logistics & Supply Chain",
  "Luxury Goods & Jewelry",
  "Machinery",
  "Management Consulting",
  "Maritime",
  "Marketing & Advertising",
  "Market Research",
  "Mechanical or Industrial Engineering",
  "Media Production",
  "Medical Device",
  "Medical Practice",
  "Mental Health Care",
  "Military",
  "Mining & Metals",
  "Motion Pictures & Film",
  "Museums & Institutions",
  "Music",
  "Nanotechnology",
  "Newspapers",
  "Nonprofit Organization Management",
  "Oil & Energy",
  "Online Publishing",
  "Outsourcing/Offshoring",
  "Package/Freight Delivery",
  "Packaging & Containers",
  "Paper & Forest Products",
  "Performing Arts",
  "Pharmaceuticals",
  "Philanthropy",
  "Photography",
  "Plastics",
  "Political Organization",
  "Primary/Secondary",
  "Printing",
  "Professional Training",
  "Program Development",
  "Public Policy",
  "Public Relations",
  "Public Safety",
  "Publishing",
  "Railroad Manufacture",
  "Ranching",
  "Real Estate",
  "Recreational",
  "Facilities & Services",
  "Religious Institutions",
  "Renewables & Environment",
  "Research",
  "Restaurants",
  "Retail",
  "Security & Investigations",
  "Semiconductors",
  "Shipbuilding",
  "Sporting Goods",
  "Sports",
  "Staffing & Recruiting",
  "Supermarkets",
  "Telecommunications",
  "Textiles",
  "Think Tanks",
  "Tobacco",
  "Translation & Localization",
  "Transportation/Trucking/Railroad",
  "Utilities",
  "Venture Capital",
  "Veterinary",
  "Warehousing",
  "Wholesale",
  "Wine & Spirits",
  "Wireless",
  "Writing & Editing",
];
