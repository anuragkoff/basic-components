import { componentLinks } from '../data/data';
import { Link } from 'react-router-dom';

function FrontPage() {
  return (
    <>
        {componentLinks.map((link) => (
            <div key={link.name}>
                <Link to={link.path}>{link.name}</Link>
            </div>
        ))}
    </>
  )
}

export default FrontPage;
