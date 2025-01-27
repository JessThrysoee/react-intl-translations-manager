// FROM:
//
// const files = [
//   {
//     path: 'src/components/Foo.json',
//     descriptors: [
//       {
//         id: 'foo_ok',
//         description: 'Ok text',
//         defaultMessage: 'OK',
//       },
//       {
//         id: 'foo_ok',
//         description: 'Submit text',
//         defaultMessage: 'Submit',
//       },
//       {
//         id: 'foo_cancel',
//         description: 'Cancel text',
//         defaultMessage: 'Cancel',
//       },
//     ],
//   },
// ];
//
// TO:
//
// TODO: figure out what message gets returned for duplicate ids
//
// const result = {
//   messages: {
//     foo_ok: 'OK | Submit',
//     foo_cancel: 'Cancel',
//   },
//   duplicateIds: [
//     'foo_ok',
//   ],
// };

function getDefaultMessages(files) {
  if (!files) throw new Error("Files are required");

  return files.reduce(
    (fileAcc, { descriptors }) => {
      const duplicateIds = fileAcc.duplicateIds;
      return {
        messages: descriptors.reduce((descAcc, { id, defaultMessage }) => {
          if (descAcc[id] !== undefined) {
            duplicateIds.push(id);
          }
          descAcc[id] = defaultMessage;
          return descAcc;
        }, fileAcc.messages),
        duplicateIds,
      };
    },
    {
      messages: {},
      duplicateIds: [],
    },
  );
}

export { getDefaultMessages };
