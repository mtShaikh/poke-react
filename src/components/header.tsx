const Header = ({ title = "PokeReact" }: { title?: string }) => (
  <div className="bg-blue-500 py-4 text-center text-white text-xl font-bold capitalize">
    {title}
  </div>
);

export default Header;
