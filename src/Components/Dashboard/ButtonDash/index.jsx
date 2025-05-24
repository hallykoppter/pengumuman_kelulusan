const ButtonDash = ({ label, color, onclick }) => {
  return (
    <button
      className={`${color} rounded-sm cursor-pointer text-white px-3 py-1`}
      onClick={onclick}
    >
      {label}
    </button>
  )
}

export default ButtonDash
