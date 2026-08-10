import React from 'react';
import { INSTAGRAM_POSTS, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/products';
import { Instagram, Heart, ExternalLink } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF7F2] text-[#2C1A14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
            Redes Sociais
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1A14] mb-3">
            Um pouco mais do nosso encanto.
          </h2>
          <p className="text-sm sm:text-base text-[#6E574F] font-light">
            Siga a Encanto Gourmet no Instagram e acompanhe bastidores, lançamentos e inspirações diárias.
          </p>

          <div className="mt-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="instagram-profile-link"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#1F120E] text-[#D4AF37] text-xs uppercase font-semibold tracking-widest hover:bg-[#2C1A14] hover:shadow-lg transition-all"
            >
              <Instagram className="w-4 h-4 text-[#D4AF37]" />
              <span>{INSTAGRAM_HANDLE}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 text-[#E8DFD5]" />
            </a>
          </div>
        </div>

        {/* 6-Photo Editorial Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD5] block"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#1F120E]/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-[#FAF7F2]">
                <div className="flex items-center justify-end">
                  <Instagram className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="text-[10px] text-[#E8DFD5] line-clamp-3 italic">
                  "{post.caption}"
                </p>
                <div className="flex items-center space-x-1 text-[11px] font-semibold text-[#D4AF37]">
                  <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
