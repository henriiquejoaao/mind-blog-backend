-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: mind_blog
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Comment_userId_fkey` (`userId`),
  KEY `Comment_postId_fkey` (`postId`),
  CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Like`
--

DROP TABLE IF EXISTS `Like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Like` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Like_userId_postId_key` (`userId`,`postId`),
  KEY `Like_postId_fkey` (`postId`),
  CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Like`
--

LOCK TABLES `Like` WRITE;
/*!40000 ALTER TABLE `Like` DISABLE KEYS */;
/*!40000 ALTER TABLE `Like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `banner` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `authorId` int NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Desenvolvimento web',
  `summary` text COLLATE utf8mb4_unicode_ci,
  `tags` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Post_authorId_fkey` (`authorId`),
  CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (20,'O Futuro da Inteligência Artificial em 2025','## Introdução\r\n\r\nA tecnologia vem transformando a forma como empresas, profissionais e usuários interagem com soluções digitais.\r\n\r\n## Principais pontos\r\n\r\n- Aplicações modernas precisam ser rápidas e intuitivas\r\n- O backend deve ser seguro e bem estruturado\r\n- O frontend precisa oferecer uma boa experiência ao usuário\r\n- Dados reais tornam o sistema mais confiável\r\n- Boas práticas ajudam na manutenção do projeto\r\n\r\n## Conclusão\r\n\r\nConstruir uma aplicação completa envolve integrar interface, API, banco de dados, autenticação e funcionalidades reais de interação.','/uploads/1779065580518-860830642.jpg','2026-05-18 00:46:01.906','2026-05-18 00:53:00.522',1,0,'Inteligência Artificial','Uma análise sobre como a inteligência artificial está impactando o desenvolvimento de soluções modernas.','IA,Tecnologia,Inovação'),(21,'Boas práticas no desenvolvimento backend','## Introdução\r\n\r\nA tecnologia vem transformando a forma como empresas, profissionais e usuários interagem com soluções digitais.\r\n\r\n## Principais pontos\r\n\r\n- Aplicações modernas precisam ser rápidas e intuitivas\r\n- O backend deve ser seguro e bem estruturado\r\n- O frontend precisa oferecer uma boa experiência ao usuário\r\n- Dados reais tornam o sistema mais confiável\r\n- Boas práticas ajudam na manutenção do projeto\r\n\r\n## Conclusão\r\n\r\nConstruir uma aplicação completa envolve integrar interface, API, banco de dados, autenticação e funcionalidades reais de interação.','/uploads/1779065589979-983378464.jpg','2026-05-18 00:46:01.906','2026-05-18 00:53:09.986',1,0,'Backend','Entenda como estruturar APIs mais seguras, organizadas e fáceis de manter.','Backend,Node,Prisma'),(22,'Como criar interfaces modernas com React','## Introdução\r\n\r\nA tecnologia vem transformando a forma como empresas, profissionais e usuários interagem com soluções digitais.\r\n\r\n## Principais pontos\r\n\r\n- Aplicações modernas precisam ser rápidas e intuitivas\r\n- O backend deve ser seguro e bem estruturado\r\n- O frontend precisa oferecer uma boa experiência ao usuário\r\n- Dados reais tornam o sistema mais confiável\r\n- Boas práticas ajudam na manutenção do projeto\r\n\r\n## Conclusão\r\n\r\nConstruir uma aplicação completa envolve integrar interface, API, banco de dados, autenticação e funcionalidades reais de interação.','/uploads/1779065602682-121176508.jpg','2026-05-18 00:46:01.906','2026-05-18 00:53:22.686',1,0,'Frontend','Veja pontos importantes para construir interfaces mais bonitas, funcionais e responsivas.','React,Frontend,UI'),(23,'A importância do banco de dados em aplicações web','## Introdução\r\n\r\nA tecnologia vem transformando a forma como empresas, profissionais e usuários interagem com soluções digitais.\r\n\r\n## Principais pontos\r\n\r\n- Aplicações modernas precisam ser rápidas e intuitivas\r\n- O backend deve ser seguro e bem estruturado\r\n- O frontend precisa oferecer uma boa experiência ao usuário\r\n- Dados reais tornam o sistema mais confiável\r\n- Boas práticas ajudam na manutenção do projeto\r\n\r\n## Conclusão\r\n\r\nConstruir uma aplicação completa envolve integrar interface, API, banco de dados, autenticação e funcionalidades reais de interação.','/uploads/1779065627450-167848922.jpg','2026-05-18 00:46:01.906','2026-05-18 00:53:47.457',1,2,'Banco de Dados','Banco de dados bem modelado é essencial para aplicações confiáveis e escaláveis.','MySQL,Prisma,Banco de Dados'),(24,'DevOps e produtividade no desenvolvimento','## Introdução\r\n\r\nA tecnologia vem transformando a forma como empresas, profissionais e usuários interagem com soluções digitais.\r\n\r\n## Principais pontos\r\n\r\n- Aplicações modernas precisam ser rápidas e intuitivas\r\n- O backend deve ser seguro e bem estruturado\r\n- O frontend precisa oferecer uma boa experiência ao usuário\r\n- Dados reais tornam o sistema mais confiável\r\n- Boas práticas ajudam na manutenção do projeto\r\n\r\n## Conclusão\r\n\r\nConstruir uma aplicação completa envolve integrar interface, API, banco de dados, autenticação e funcionalidades reais de interação.','/uploads/1779065860786-5183244.jpg','2026-05-18 00:46:01.906','2026-05-18 00:57:40.790',1,2,'DevOps','Automação, organização e versionamento ajudam a acelerar o ciclo de desenvolvimento.','DevOps,Git,Deploy'),(25,'Como melhorar a experiência do usuário em sistemas web','## Introdução\r\n\r\nA tecnologia vem transformando a forma como empresas, profissionais e usuários interagem com soluções digitais.\r\n\r\n## Principais pontos\r\n\r\n- Aplicações modernas precisam ser rápidas e intuitivas\r\n- O backend deve ser seguro e bem estruturado\r\n- O frontend precisa oferecer uma boa experiência ao usuário\r\n- Dados reais tornam o sistema mais confiável\r\n- Boas práticas ajudam na manutenção do projeto\r\n\r\n## Conclusão\r\n\r\nConstruir uma aplicação completa envolve integrar interface, API, banco de dados, autenticação e funcionalidades reais de interação.','/uploads/1779065869555-147508032.jpg','2026-05-18 00:46:01.906','2026-05-18 00:57:49.583',1,0,'Desenvolvimento web','Pequenos detalhes de interface podem deixar uma aplicação muito mais agradável de usar.','UX,UI,Web'),(26,'Autenticação em aplicações modernas','## Introdução\r\n\r\nA tecnologia vem transformando a forma como empresas, profissionais e usuários interagem com soluções digitais.\r\n\r\n## Principais pontos\r\n\r\n- Aplicações modernas precisam ser rápidas e intuitivas\r\n- O backend deve ser seguro e bem estruturado\r\n- O frontend precisa oferecer uma boa experiência ao usuário\r\n- Dados reais tornam o sistema mais confiável\r\n- Boas práticas ajudam na manutenção do projeto\r\n\r\n## Conclusão\r\n\r\nConstruir uma aplicação completa envolve integrar interface, API, banco de dados, autenticação e funcionalidades reais de interação.','/uploads/1779065878171-427821074.jpg','2026-05-18 00:46:01.906','2026-05-18 00:57:58.173',1,0,'Backend','Login, token JWT e rotas protegidas são partes fundamentais de sistemas reais.','JWT,Auth,Segurança'),(27,'Markdown em plataformas de conteúdo','## Introdução\r\n\r\nA tecnologia vem transformando a forma como empresas, profissionais e usuários interagem com soluções digitais.\r\n\r\n## Principais pontos\r\n\r\n- Aplicações modernas precisam ser rápidas e intuitivas\r\n- O backend deve ser seguro e bem estruturado\r\n- O frontend precisa oferecer uma boa experiência ao usuário\r\n- Dados reais tornam o sistema mais confiável\r\n- Boas práticas ajudam na manutenção do projeto\r\n\r\n## Conclusão\r\n\r\nConstruir uma aplicação completa envolve integrar interface, API, banco de dados, autenticação e funcionalidades reais de interação.','/uploads/1779065886960-427773016.jpg','2026-05-18 00:46:01.906','2026-05-18 00:58:06.963',1,0,'Desenvolvimento web','Renderizar Markdown permite criar artigos mais ricos, organizados e fáceis de ler.','Markdown,Artigos,Conteúdo');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'João Teste','joao@email.com','$2b$10$Tcg9KalucDNFOWMeZ2Ei0eEqePWNrGtbwj26C1qfwJx.92TeWtUBa','2026-05-15 19:13:32.915'),(2,'Pedro','pedro@email.com','$2b$10$FRbRu6Gg6.sQlkanSKQUC.s5nUUsCECOOzNRr03SF0B8ZCG2Qynji','2026-05-15 20:44:49.854'),(3,'Lucas','lucas@email.com','$2b$10$SPDaPYc0uYhVc5HNOoR5LuafUE0IzS2ujq9nY3Tjt8ODjl44UVMcq','2026-05-17 19:31:37.242'),(4,'Moles','moles@email.com','$2b$10$YhiIcdNsXEjw4zdF6j6/3evM7fuDJRl8qhClYtpODyhBaDXvNfzCG','2026-05-17 21:39:53.423'),(5,'carlos','carlos@email.com','$2b$10$EuKqGbuig1QbV7XdAcYlPOTze2RS/0cFGinUbmg78JB0kK3ksKmTa','2026-05-17 23:55:58.746');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('056e2525-7a80-4a08-8410-a0f2b54a3246','a6692f03d61204ace526604b4cbcb1dabec15c3303d6538f5743ae1847848ef2','2026-05-17 22:44:47.350','20260517224447_add_post_summary_category_tags',NULL,NULL,'2026-05-17 22:44:47.330',1),('75f8b862-084a-4982-9d00-43c95c0b7fed','52cefc60fa030331ab93f8a6a19a82077bf93f35af3a169afe2a3760b3cee9ae','2026-05-17 21:53:37.608','20260517215337_add_post_interactions',NULL,NULL,'2026-05-17 21:53:37.455',1),('fb6bacef-9474-4cf0-a3f5-eb5b6308218f','ce45241e9ed69d7016ec4e2a364607a77f3069017c2833050da01e3a36c151e3','2026-05-15 17:58:06.810','20260515175806_init',NULL,NULL,'2026-05-15 17:58:06.743',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-17 22:02:28
