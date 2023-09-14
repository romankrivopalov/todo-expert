import { useState } from 'react';
import s from './Sort.module.scss';
import cn from 'classnames';

const Sort = ({
  handleSortTask,
  isActiveSortBtn,
  setIsActiveSortBtn
}) => {
  const [ isReverse, setIsSorted ] = useState(false);

  const handleEnableSort = () => {
    if (isActiveSortBtn) {
      setIsSorted(!isReverse);
      handleSortTask(!isReverse);
    } else {
      handleSortTask(isReverse);
    }

    setIsActiveSortBtn(true);
  }

  return (
    <button
      className={cn(s.sort, isActiveSortBtn && s.sort_active, isReverse && s.sort_reverse)}
      onClick={() => handleEnableSort()}
    />
  )
}

export default Sort
