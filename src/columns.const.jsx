export const datasetColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    render: (text) => <span className="text-primary-text">{text}</span>,
    sorter: (a, b) => a?.title?.localeCompare(b?.title),
  },
  {
    title: 'Animal ID',
    dataIndex: 'animalId',
    key: 'animalId',
    width: 150,
    render: (text) => <span className="text-secondary-text text-sm">{text}</span>,
    sorter: (a, b) => a?.animalId - b?.animalId, // Assuming animalId is numeric
  },
  {
    title: 'Block ID',
    dataIndex: 'blockId',
    key: 'blockId',
    width: 150,
    render: (text) => <span className="text-secondary-text text-sm">{text}</span>,
    sorter: (a, b) => a?.blockId?.localeCompare(b?.blockId)
  },
  {
    title: 'Modality',
    dataIndex: 'modality',
    key: 'modality',
    width: 150,
    render: (text) => <span className="text-secondary-text text-sm">{text}</span>,
    sorter: (a, b) => a?.modality?.localeCompare(b?.modality),
  },
  {
    title: 'Sex',
    dataIndex: 'attributes?.sex',
    key: 'attributes?.sex',
    width: 150,
    render: (_text, record) => <span className="text-secondary-text text-sm">{record?.attributes?.sex == "M" ? "Male" : "Female"}</span>,
    sorter: (a, b) => a?.attributes?.sex?.localeCompare(b?.attributes?.sex),
  },
];