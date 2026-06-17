import React from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Analytics", "Pricing", "Security"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Guides", "Blog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Privacy", "Terms"],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <div className="w-4 h-4 bg-black rounded-sm" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Churnly</span>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              The next-generation churn analytics platform for modern ecommerce teams.
              Built for speed, security, and scalability.
            </p>
            <div className="flex items-center gap-4">
              {[FaGithub, FaTwitter, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                  <Icon className="w-5 h-5 text-white/60 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, i) => (
            <div key={i} className="flex flex-col gap-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">{column.title}</h4>
              <ul className="flex flex-col gap-4">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group">
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Churnly Analytics Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
