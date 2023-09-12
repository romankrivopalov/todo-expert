import { ReactComponent as LogoutSVG } from '../../assets/icon-logout.svg';
import s from './BtnLogOut.module.scss';

const BtnLogOut = ({ onSignout }) => {

  const handleLogOut = () => {
    onSignout();
  }

  return (
    <button
      className={s.logout}
      onClick={handleLogOut}>
      <LogoutSVG />
    </button>
  )
}

export default BtnLogOut
