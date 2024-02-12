interface LinkProps {
  url: string;
  description: string;
  author: string;
}

const LinkComponent: React.FC<LinkProps> = ({ url, description, author }) => {
  return (
    <div>
      {description} ({url}) ({author})
    </div>
  );
};

export default LinkComponent;
