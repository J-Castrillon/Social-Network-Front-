import React from "react";
import { deleteFetching } from "../../helpers/Fetching/Fetchs";
import Swal from "sweetalert2";

export const Delete = ({ publicationId, articles, setArticles }) => {
  const deletePublication = async () => {
    Swal.fire({
      title: "¿Estas seguro de que quieres eliminar la publicación?",
      width: 500,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      confirmButtonAriaLabel: "red",
      showClass: {
        popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
      },
      hideClass: {
        popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const request = await deleteFetching(
          `publication/remove/${publicationId}`
        );

        if (request?.status === "Success") {
          const newArticlesList = articles.filter(
            (article) => article._id !== publicationId
          );
          setArticles(newArticlesList);
        }
      }
    });
  };

  return (
    <div className="post__buttons">
      <a href="#" className="post__button" onClick={deletePublication}>
        <i className="fa-solid fa-trash-can"></i>
      </a>
    </div>
  );
};
