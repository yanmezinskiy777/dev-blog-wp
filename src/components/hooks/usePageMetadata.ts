import { useContext } from "react";
import { useRouter } from "next/router";

import { AppContext } from "./useApp";
import { constructPageMetadata } from "../../utils/metadata/metadata";
import { IPost } from "../posts/types";

export default function usePageMetadata({
  metadata: pageMetadata,
}: {
  metadata: IPost;
}) {
  const { metadata: defaultMetadata } = useContext(AppContext);

  const router = useRouter();
  const homepage = process.env.HOME_PAGE || "";

  const metadata = constructPageMetadata(
    defaultMetadata as IPost,
    pageMetadata,
    {
      homepage,
      router,
    }
  );

  return {
    metadata,
  };
}
