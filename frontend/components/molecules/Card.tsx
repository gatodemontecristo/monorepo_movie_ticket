import React, { createContext, useContext, ReactNode } from 'react';

// 1. Context para compartir estado entre componentes
interface CardContextValue {
  variant?: 'default' | 'movie' | 'featured';
}

const CardContext = createContext<CardContextValue>({});

// 2. Hook para usar el contexto
const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card components must be used within Card');
  }
  return context;
};

// 3. Componente principal Card
interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'movie' | 'featured';
  className?: string;
}

const Card = ({ children, variant = 'default', className = '' }: CardProps) => {
  const baseClasses = 'rounded-lg overflow-hidden shadow-lg';
  const variantClasses = {
    default: 'bg-white',
    movie: 'bg-movie-black border border-movie-metal',
    featured: 'bg-gradient-to-br from-movie-duck to-movie-yellow',
  };

  return (
    <CardContext.Provider value={{ variant }}>
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </div>
    </CardContext.Provider>
  );
};

// 4. Sub-componente Header
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  const { variant = 'default' } = useCardContext();

  const variantClasses = {
    default: 'text-gray-900',
    movie: 'text-movie-duck',
    featured: 'text-movie-black',
  };

  return (
    <div className={`p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

// 5. Sub-componente Image
interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CardImage = ({ src, alt, className = '' }: CardImageProps) => {
  return (
    <div className={`relative w-full h-48 ${className}`}>
      <img src={src} alt={alt} className='w-full h-full object-cover' />
    </div>
  );
};

// 6. Sub-componente Content
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

const CardContent = ({ children, className = '' }: CardContentProps) => {
  const { variant = 'default' } = useCardContext();

  const variantClasses = {
    default: 'text-gray-700',
    movie: 'text-movie-metal',
    featured: 'text-movie-black',
  };

  return (
    <div className={`p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

// 7. Sub-componente Footer
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  const { variant = 'default' } = useCardContext();

  const variantClasses = {
    default: 'bg-gray-50 text-gray-600',
    movie: 'bg-movie-black/20 text-movie-duck',
    featured: 'bg-black/10 text-movie-black',
  };

  return (
    <div className={`p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

// 8. Sub-componente Title
interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

const CardTitle = ({ children, className = '' }: CardTitleProps) => {
  return (
    <h3 className={`text-xl font-bold font-mont ${className}`}>{children}</h3>
  );
};

// 9. Sub-componente Description
interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

const CardDescription = ({
  children,
  className = '',
}: CardDescriptionProps) => {
  return <p className={`text-sm font-caros ${className}`}>{children}</p>;
};

// 10. Exportar todos los componentes como propiedades del componente principal
Card.Header = CardHeader;
Card.Image = CardImage;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;
