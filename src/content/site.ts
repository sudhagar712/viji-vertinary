import clinicThumb from "@/assets/video-clinic.jpg";
import appThumb from "@/assets/video-app.jpg";
import ledgerThumb from "@/assets/video-ledger.jpg";
import farmThumb from "@/assets/video-farm.jpg";

export const DEVELOPER_PROFILE_URL =
  "https://play.google.com/store/apps/dev?id=7617286356493197451";
export const DEVELOPER_ID = "7617286356493197451";

export const contact = {
  location: "Puducherry, 605001, India",
  admin: "admin@vigevetlabs.xyz",
  support: "vige.vet@live.com",
  phone: "+91 99656 69509",
  phoneHref: "tel:+919965669509",
};

export const instagram = {
  handle: "@vige.dr",
  href: "https://www.instagram.com/vige.dr/",
};

export type VideoPost = {
  title: string;
  tag: string;
  duration: string;
  thumbnail: string;
  /** YouTube video id, e.g. "dQw4w9WgXcQ". Leave empty to show "coming soon". */
  youtubeId: string;
};

export const videos: VideoPost[] = [
  {
    title: "Digital health records, right at the exam table",
    tag: "Clinic",
    duration: "2:14",
    thumbnail: clinicThumb,
    youtubeId: "",
  },
  {
    title: "Register your pet in under a minute",
    tag: "Android App",
    duration: "1:38",
    thumbnail: appThumb,
    youtubeId: "",
  },
  {
    title: "Why Hedera Hashgraph keeps records tamper-proof",
    tag: "Web3",
    duration: "3:05",
    thumbnail: ledgerThumb,
    youtubeId: "",
  },
  {
    title: "Livestock care, logged from the field",
    tag: "Field",
    duration: "2:47",
    thumbnail: farmThumb,
    youtubeId: "",
  },
];
