import { useEffect, useState } from 'react'
import { filterDataset, getDatasetDetails } from '../axios'
import { useDebounce } from './common'


// for testing purposes
// const filterObj = {
//         "orderBy": "createdAt",
//         "order": "asc", // asc or desc
//         "attributes": {
//           "sex": [
//             "M"
//           ],
//           "group": [
//             "SDI-18",
//             "SDA-9"
//           ]
//         }
//       }

export const useDatasets = (projectId, sponsorId) => {
  const [datasets, setDatasets] = useState({
    data: null,
    loading: false,
    error: null
  })
  const [datasetDetails, setDatasetDetails] = useState({
    data: null,
    loading: false,
    error: null
  })
  const [filterForm, setFilterForm] = useState({
    title: "",
    sex: ""
  })
  const [page, setPage] = useState(1);
  const debouncedSearchValue = useDebounce(filterForm.title, 500);

  const fetchDatasets = async () => {
    setDatasets({ ...datasets, loading: true })
    try {
      const filterObj = {
        "orderBy": "createdAt",
        "order": "asc", // asc or desc
        "attributes": {
        }
      }
      if (filterForm.sex) filterObj.attributes.sex = [filterForm.sex]
      if (filterForm.title) filterObj.title = filterForm.title

      const response = await filterDataset(projectId, sponsorId, filterObj, page);
      if (response?.status !== 200) throw new Error('Failed to fetch datasets')

      const hashKey = response?.data?.data?.[0]?.hash || "";
      setDatasets({ data: response?.data, loading: false, error: null })
      fetchDatasetDetails(hashKey) // Fetch details for the first dataset
    } catch (error) {
      setDatasets({ ...datasets, loading: false, error: error.message })
    }
  }

  const fetchDatasetDetails = async (hashKey) => {
    setDatasetDetails({ ...datasetDetails, loading: true })
    try {
      const response = await getDatasetDetails(hashKey);
      if (response?.status !== 200) throw new Error('Failed to fetch dataset details')

      setDatasetDetails({ data: response?.data, loading: false, error: null })
    } catch (error) {
      setDatasetDetails({ ...datasetDetails, loading: false, error: error.message })
    }
  }

  const onSelectFilterBy = (value) => {
    setFilterForm({ ...filterForm, sex: value })
  }

  const onChangeTitle = (e) => {
    setFilterForm({ ...filterForm, title: e.target.value })
  }

  const onPageChange = (page) => {
    setPage(page);
  }

  useEffect(() => {
    fetchDatasets()
  }, [page, filterForm.sex, debouncedSearchValue])

  return {
    datasets,
    datasetDetails,
    page,
    onSelectFilterBy,
    onChangeTitle,
    fetchDatasetDetails,
    onPageChange
  }
}