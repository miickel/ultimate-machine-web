import React, { useEffect, useState } from "react"
import styles from "./DarkModeToggle.module.sass"

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <div className={styles.toggle}>
      <input
        type="checkbox"
        value={isDarkMode}
        onChange={onToggle}
        id="dm-toggle"
        className={styles.checkbox}
      />
      <label htmlFor="dm-toggle">Toggle Dark Mode</label>
    </div>
  )
}

export default DarkModeToggle
