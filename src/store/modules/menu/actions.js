import Menus from "../../../apis/Menus";

export const deleteMenu = async ({ dispatch }, menu) => {
  await Menus.delete(menu.id);
  dispatch(
    "notifications/addNotification",
    {
      type: "error",
      message: "Menu supprimé",
    },
    { root: true }
  );
};

export const editMenu = async ({ dispatch }, menu) => {
  await Menus.edit(menu.id, {
    libelle: menu.libelle,
    prix: menu.prix,
  }).then(async (resp) => {
    let updatedMenu = resp.data;
    await Menus.editDetails(updatedMenu.menuDetails[0].id, {
      menu: updatedMenu["@id"],
      plat: menu.plat1,
    });
    await Menus.editDetails(updatedMenu.menuDetails[1].id, {
      plat: menu.plat2,
    });
  });

  dispatch(
    "notifications/addNotification",
    {
      type: "success",
      message: "Menu updated successfully",
    },
    { root: true }
  );
};
