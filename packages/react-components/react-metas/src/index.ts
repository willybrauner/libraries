import { MetasManager, TMetaTags, TTag } from "@wbe/metas-manager";
import { useEffect } from "react";

export type TMetasProps = {
  values?: TMetaTags<string>;
  tags?: TMetaTags<TTag[]>;
  autoCreateMetaTag?: boolean;
  autoRemoveMetaTag?: boolean;
};

Metas.defaultProps = {
  tags: MetasManager.DEFAULT_META_TAGS,
  autoCreateMetaTag: true,
  autoRemoveMetaTag: true,
};

export function Metas(props: TMetasProps) {
  useEffect(() => {
    MetasManager.inject(props);
  }, [props]);
  return null;
}
