import React from "react"
import { Link } from "gatsby"
import { MdOpenInBrowser } from "react-icons/md"
import Card from "./Card.js"
import ButtonList from "./ButtonList.js"
import Button from "./Button.js"
import TagList from "./TagList.js"
import PreviewCompatibleImage from "./PreviewCompatibleImage.js"
import styles from "./ProductListItem.module.sass"

const ProductListItem = ({
  title,
  description,
  slug,
  url,
  tags,
  featuredImage,
  startDate,
  endDate,
  exitDescription,
}) => {
  return (
    <li className={styles.item}>
      <Card Elem="div" to={slug} className={styles.card}>
        <div className={styles.content}>
          <h2>
            <Link to={slug}>{title}</Link>
          </h2>
          <TagList tags={tags} />
          <p>{description}</p>
        </div>
        <PreviewCompatibleImage
          imageInfo={{
            image: featuredImage,
            alt: `Ultimate Machine - ${title}`,
          }}
        />
        <div className={styles.content}>
          <footer className={styles.footer}>
            <div className={styles.date}>
              <span>{startDate}</span>{" "}
              {endDate && (
                <>
                  {" - "}
                  <span title={exitDescription}>{endDate}</span>
                </>
              )}
            </div>
            <ButtonList>
              {url && (
                <Button Elem="a" href={url}>
                  <MdOpenInBrowser /> Explore
                </Button>
              )}
              <Button Elem={Link} to={slug}>
                Learn more
              </Button>
            </ButtonList>
          </footer>
        </div>
      </Card>
    </li>
  )
}

export default ProductListItem
