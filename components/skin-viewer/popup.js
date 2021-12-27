import {
  Box,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Folder,
  Globe,
  Palette,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { asset } from "../../data/helpers";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export function Popup({ skin }) {
  const [showChromas, setShowChromas] = useState(false);
  useEffect(() => {
    setShowChromas(false);
  }, [skin]);
  const meta = skin.$skinExplorer;
  return (
    <aside className={styles.popup} onTouchStart={(e) => e.stopPropagation()}>
      <nav>
        <div>
          <User />
          <Link href="/champions/[key]" as={`/champions/${meta.champion.key}`}>
            <a>
              <span>{meta.champion.name}</span>
            </a>
          </Link>
        </div>
        {!!meta.universes.length && (
          <div>
            <Globe />
            {meta.universes.map((u) => (
              <Link key={u.id} href="/universes/[id]" as={`/universes/${u.id}`}>
                <a>
                  <span>{u.name}</span>
                </a>
              </Link>
            ))}
          </div>
        )}
        {!!meta.skinlines.length && (
          <div>
            <Folder />
            {meta.skinlines.map((l) => (
              <Link key={l.id} href="/skinlines/[id]" as={`/skinlines/${l.id}`}>
                <a>
                  <span>{l.name}</span>
                </a>
              </Link>
            ))}
          </div>
        )}
      </nav>
      {skin.description && (
        <p dangerouslySetInnerHTML={{ __html: skin.description }} />
      )}
      {skin.chromas && (
        <>
          <h3 onClick={() => setShowChromas(!showChromas)}>
            <span>
              <Palette /> {skin.chromas.length + 1} Chromas
            </span>
            {showChromas ? <ChevronUp /> : <ChevronDown />}
          </h3>
          {showChromas && (
            <div className={styles.chromas}>
              {[skin, ...skin.chromas].map((chroma) => (
                <div key={chroma.id}>
                  <a
                    href={asset(chroma.chromaPath)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      unoptimized
                      src={asset(chroma.chromaPath)}
                      layout="fill"
                      alt={skin.name}
                    />
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {/* <div className={styles.external}>
        <a href={meta.teemoGGUrl} target="_blank" rel="noreferrer">
          <Box />
          View on Teemo.GG
          <ExternalLink />
        </a>
      </div> */}
      <a href={meta.teemoGGUrl} target="_blank" rel="noreferrer">
        <h3>
          <span>
            <Box />
            View on Teemo.GG
          </span>
          <ExternalLink />
        </h3>
      </a>
    </aside>
  );
}
