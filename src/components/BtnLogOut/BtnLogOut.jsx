import { ReactComponent as LogoutSVG } from '../../assets/icon-logout.svg';
import s from './BtnLogOut.module.scss';

const BtnLogOut = () => {

  const handleLogOut = () => {

  }

  return (
    <button className={s.logout}>
      <LogoutSVG />
    </button>
  )
}

export default BtnLogOut
