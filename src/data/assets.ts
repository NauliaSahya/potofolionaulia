/**
 * Central image configuration.
 *
 * Every image path used across the site is defined here, and nowhere else.
 * To replace an image, drop a new file into /public/images using the SAME
 * filename referenced below, or update the path here if you rename it.
 *
 * See the README ("How to replace portfolio images") for full instructions.
 */

export const assets = {
  profile: '/images/fotoku2.webp',
  lanyardProfile: '/images/fotoku1.webp',
  ogCover: '/images/fotoku2.webp',

  projects: {
    sirj: {
      admin: '/images/sirj-admin.webp',
      dokter: '/images/sirj-dokter.webp',
      pasien: '/images/sirj-pasien.webp',
      staff: '/images/sirj-staff.webp',
      patient: '/images/sirj-patient.webp',
      fhir: '/images/sirj-fhir.webp',
      architecture: '/images/sirj-architecture.webp',
    },
    cenim: {
      home: '/images/cenim.webp',
      schedule: '/images/cenim.webp',
      event: '/images/cenimfoto.webp',
    },
    hime: {
      ui1: '/images/hime-ui-1.webp',
      ui2: '/images/hime-ui-2.webp',
      web1: '/images/hime-web-1.webp',
      web2: '/images/hime-web-2.webp',
      ui: '/images/hime-web-2.webp',
      device: '/images/hime-ui-1.webp',
    },
    hospital: {
      flow1: '/images/kp-flow-1.webp',
      flow2: '/images/kp-flow-2.webp',
      kegiatanPagi: '/images/kp-kegiatan-pagi.webp',
      presentasi1: '/images/kp-presentasi-1.webp',
      presentasi2: '/images/kp-presentasi-2.webp',
      figma: '/images/kp-flow-1.webp',
    },
  },
} as const
