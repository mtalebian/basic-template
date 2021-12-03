USE [Backend]
GO

/****** Object:  Table [pur].[Demends]    Script Date: 12/4/2021 12:09:06 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [pur].[Demends](
	[CompanyCode] [varchar](20) NOT NULL,
	[DemandNo] [nchar](10) NOT NULL,
	[DocTypeId] [nchar](10) NOT NULL,
	[PGroup] [varchar](5) NOT NULL,
	[NeedDate] [datetime] NOT NULL,
	[Requisitioner] [varchar](20) NULL,
	[Plant] [varchar](5) NULL,
	[SLoc] [varchar](5) NULL,
	[TrackingNo] [varchar](20) NULL,
	[ReleaseInd] [int] NOT NULL,
	[IsReleased] [bit] NOT NULL,
	[StatusId] [int] NOT NULL,
	[DeletionFlag] [bit] NOT NULL,
	[ModifiedBy] [varchar](20) NOT NULL,
	[ModifiedAt] [datetime] NOT NULL,
	[CreatedBy] [varchar](20) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
 CONSTRAINT [PK_Demends_1] PRIMARY KEY CLUSTERED 
(
	[CompanyCode] ASC,
	[DemandNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [pur].[Demends] ADD  CONSTRAINT [DF_Demends_IsReleased]  DEFAULT ((0)) FOR [IsReleased]
GO

ALTER TABLE [pur].[Demends] ADD  CONSTRAINT [DF_Demends_DeletionFlag]  DEFAULT ((0)) FOR [DeletionFlag]
GO


