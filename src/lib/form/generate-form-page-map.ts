import { FormPageInput } from "@/models/form/input/form-page-input.d";
import { FormPageMap } from "@/models/form/usable/form-page-map.d";


export const generateFormPageMap = (formDataInput: FormPageInput[]): FormPageMap => {
    const formPageMap: FormPageMap = {};
  
    formDataInput.forEach((page, pageIndex) => {
      const pageId = `page${pageIndex + 1}`;
      formPageMap[pageId] = {
        id: pageId,
        name: page.name,
        formGroups: {},
      };
      page.formGroups.forEach((group, groupIndex) => {
        const groupId = `${pageId}-group${groupIndex + 1}`;
        formPageMap[pageId].formGroups[groupId] = {
          id: groupId,
          name: group.name,
          formItems: {},
        };
  
        group.formItems.forEach((item, itemIndex) => {
          const itemId = `${groupId}-item${itemIndex + 1}`;
          formPageMap[pageId].formGroups[groupId].formItems[itemId] = {
            id: itemId,
            ...item,
            options: undefined,
          };
  
          if (item.options) {
            formPageMap[pageId].formGroups[groupId].formItems[itemId].options =
              {};
            item.options.forEach((option, optionIndex) => {
              const optionId = `${itemId}-option${optionIndex + 1}`;
              formPageMap[pageId].formGroups[groupId].formItems[itemId].options![
                optionId
              ] = {
                id: optionId,
                ...option,
              };
            });
          }
        });
      });
    });
  
    return formPageMap;
  };