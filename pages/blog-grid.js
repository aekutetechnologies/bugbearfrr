import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import authService from "./auth";
import NewFieldPopup from "./NewField";
import "./scroll.css";
import Jsontimezones from "./TimeZones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { API_URL } from "./ApiConfig";
import EditUserModal from "./EditUserModal";
import AddUserGroupModal from "./AddUserGroupModal";
import NewFileShareModal from "./NewFileShareModal";
import TimezoneModal from "./TimeZoneModal";
import NewGlobalField from "./NewGlobalField";
import { toast } from "react-toastify";
import CustomAlert from "./CustomAlert";
import Chatbot from "./Chatbot";
import ProfileModal from "./ProfileModal";
import ErrorPopup from "./ErrorPopup";
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import debounce from "lodash/debounce";
import { useViewportDimensions } from "./ViewportContext";
import "./admin.css";

const calculateViewportSize = (percentage) => {
  const width = window.innerWidth * (percentage / 100);
  const height = window.innerHeight * (percentage / 100);
  return { width, height };
};
const getViewportDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const NewAdminPanel = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [editedUserGroup, setEditedUserGroup] = useState({
    name: '',
    description: '',
    dcgroups_id: [],
    roles: [], 
  });
  const [input1Error , setInput1Error] = useState('');
  const { viewportHeight, viewportWidth } = useViewportDimensions();
  const [showChatbot, setShowChatbot] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [noDataMessage, setNoDataMessage] = useState("");
  const popupRef = useRef(null);
  const [token, setToken] = useState(null);
  const [isTimezoneModalOpen, setIsTimezoneModalOpen] = useState(false);

  const [permissions, setPermissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [customerFiles, setCustomerFiles] = useState([]);

  const [isAddUserGroup, setIsAddUserGroup] = useState(false);
  const [userGroupsData, setUserGroupsData] = useState([]);
  const [containerData, setContainerData] = useState([]);
  const [fileShareData, setFileShareData] = useState([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState({
    label: "Select Timezone",
    value: null,
  });
  const [isFileSizeUnitDropdownOpen, setIsFileSizeUnitDropdownOpen] =
    useState(false);

  const [timeZones, setTimeZones] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  const [activeTab, setActiveTab] = useState("userGroup");
  const [downloadFileSize, setDownloadFileSize] = useState("");
  const [fileSizeUnit, setFileSizeUnit] = useState("Bytes");
  const [inputValue, setInputValue] = useState("");

  const [texinputValue, setTextInputValue] = useState("");

  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [downloadConfigApiData, setDownloadConfigApiData] = useState(null);
  const [newFieldName, setNewFieldName] = useState("");
  const [newStorageFieldName, setNewStorageFieldName] = useState("");
  const [newFieldIsMasked, setNewFieldIsMasked] = useState(false);
  const [isNewFieldVisible, setisNewFieldVisible] = useState(false);

  const [columnData, setColumnData] = useState([]);

  const [pageSize, setPageSize] = useState(10);
  const newFieldRef = useRef(null);

  const [selectedContainer, setSelectedContainer] = useState(null);

  const [selectedUserGroup, setSelectedUserGroup] = useState(null);

  const [showTopBtn, setShowTopBtn] = useState(false);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);

  const [showAccountKey, setShowAccountKey] = useState(true);
  const [chosenItems, setChosenItems] = useState(new Set());

  const [totalPages, setTotalPages] = useState(1);

  const [dataType, setDataType] = useState(null);
  const [newAccountKey, setNewAccountKey] = useState("");
  const [newFilePath, setNewFilePath] = useState("");

  const [roles, setRoles] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [availableItems, setAvailableItems] = useState([]);

  const [dcGroups, setDcGroups] = useState([]);

  const [responseMessage, setResponseMessage] = useState("");
  const [inputValue1, setInputValue1] = useState([]);
  const [inputValue2, setInputValue2] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewFieldVisibleStorage, setisNewFieldVisibleStorage] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [isNewFieldVisibleFileShare, setisNewFieldVisibleFileShare] =
    useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState("User Group");
  const [modifiedFileShares, setModifiedFileShares] = useState([]);

  const [newFileShares, setNewFileShares] = useState([]);

  const [fileShareSyncStatus, setFileShareSyncStatus] = useState({});

  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(true);
  const [selectedFileShareForDeletion, setSelectedFileShareForDeletion] =
    useState(null);
  const [selectedUserGroupDeletion, setSelectionUserGroupDeletion] =
    useState(null);

  const [selectedStorageRowForDeletion, setSelectedStorageRowForDeletion] =
    useState(null);
  const [storageContainerSyncStatus, setStorageContainerSyncStatus] = useState(
    {}
  );

  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showZoomPopup, setShowZoomPopup] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileName, setFileName] = useState("");

  const [isFileShareModal, setIsFileShareModal] = useState(false);

  const [isMiscellaneousModal, setIsMiscellaneousModal] = useState(false);

  const [isGlobalColumnModal, setIsGlobalColumnModal] = useState(false);

  const [activeModal, setActiveModal] = useState();

  const [isStorageContainerModal, setIsStorageContainerModal] = useState(false);

  const [isFileContainerModal, setIsFileContainerModal] = useState(false);

  const [isMisContainerModal, setIsMisContainerModal] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const [timezoneOptions, setTimezoneOptions] = useState([
    { label: "Time Zone", value: null },
    { label: "UTC", value: "UTC" },
    { label: "Australia/Sydney", value: "Australia/Sydney" },

  ]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedNavbarOption, setSelectedNavbarOption] = useState(null);
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [viewportSize, setViewportSize] = useState(calculateViewportSize(90));

  const [percentage, setPercentage] = useState(90); 

  const handleResize = () => {

    const zoomLevel =
      100 * (window.innerWidth / document.documentElement.clientWidth);
    const adjustedPercentage = Math.min(100, zoomLevel); 
    setViewportSize(calculateViewportSize(adjustedPercentage));
    setPercentage(adjustedPercentage);
  };

  useEffect(() => {
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const options = Jsontimezones.map((timezone) => ({
      value: timezone,
      label: timezone,
    }));
    setTimeZones(options);
  }, []);

  useEffect(() => {

    const timeout = setTimeout(() => {
      setLoading(false); 
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleResize = () => {};

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "=") {

        setIsZoomedIn(true);
      } else if (event.ctrlKey && event.key === "-") {

        setIsZoomedIn(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleZoomChange = (event) => {
      if (event.ctrlKey) {
        event.preventDefault(); 

        if (event.code === "Equal" || event.code === "NumpadAdd") {

          if (zoomLevel < 200) {

            setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200));
            setShowZoomPopup(true); 
          }
        } else if (event.code === "Minus" || event.code === "NumpadSubtract") {

          if (zoomLevel > 50) {
            setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 100));
            setShowZoomPopup(true); 
          }
        }
      }
    };

    window.addEventListener("keydown", handleZoomChange);

    return () => {
      window.removeEventListener("keydown", handleZoomChange);
    };
  }, [zoomLevel]);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowZoomPopup(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showZoomPopup]);

  useEffect(() => {
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";

    return () => {

      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []); 

  useEffect(() => {
    if (showPreview) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showPreview]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedToken = await authService.getToken();
      const dataObject = JSON.parse(fetchedToken);

      const token = dataObject.data.token;
      const email = dataObject.data.email;
      setToken(token);
      setUserEmail(email);

      const fetchedpermissions = authService.getPermissions();
      const permissions = dataObject.data.permissions;
      setPermissions(permissions);
      setLoading(false);
      const userGroupsResponse = await fetch(
        `${API_URL}/api/core/blob-groups/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userGroupsResponse.ok) {
        if (userGroupsResponse.status === 401) {
          const responseData = await userGroupsResponse.json();
          if (responseData.error === "Access token has expired") {
            window.location.href = "/";
            return;
          }
        }
      }

      const userGroupsData = await userGroupsResponse.json();

      setUserGroupsData(userGroupsData);
      setLoading(false);
      setLoading(false);
    } catch (error) {
      console.error("Fetch data error:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {

    fetchData()
    handleUserPermissions();
    handleEditUserPermissions();

}, [token]);

  const handleFileSizeUnitChange = (unit) => {
    setFileSizeUnit(unit);
    setIsFileSizeUnitDropdownOpen(false);
  };

  const handleDownloadFileSizeChange = (e) => {
    setDownloadFileSize(e.target.value);
  };

  const fetchDownloadConfigData = async (inputValue = "") => {
    setLoading(true);
    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }
      const response = await fetch(`${API_URL}/api/admin/list-global-column/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          search_query: inputValue,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          const responseData = await response.json();
          if (responseData.error === "Access token has expired") {
            window.location.href = "/";
            return;
          }
        }
        console.error("Error fetching global columns:", response.status);

              return []; 
      }

      if (response.ok) {
        const downloadConfigData = await response.json();
        const data = downloadConfigData.data || [];

        if (downloadConfigData.data.length === 0) {

          setNoDataMessage("No data is availale");
          setDownloadConfigApiData([]);
          setLoading(false);
          setShowPreview(false); 
          setTotalPages(0);
          return;
        }

        setDownloadConfigApiData(downloadConfigData.data);
        setIsGlobalColumnModal(true);
        setLoading(false);
        setShowPreview(true);

        const total =
          downloadConfigData.data.length > 0
            ? downloadConfigData.data[0].total
            : 0;
        setTotalPages(Math.ceil(total / pageSize));

        return data;

      } else {
        console.error("Error fetching global columns:", response.status);
        toast.error("Failed to fetch global columns");
      }
    } catch (error) {
      console.error("Error in fetchDownloadConfigData:", error);
      return [];
    }
  };

  useEffect(() => {

    if (selectedOption === "Global Column Config") {
      fetchDownloadConfigData();
    }

  }, [token, selectedOption]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setInputValue(inputValue);
  }

  const handleGlobalSearchClick = async () => {
    try {
      const result = await fetchDownloadConfigData(inputValue); 

      if (result && Array.isArray(result) && result.length > 0) {
        setInputValue(inputValue);  
        setError("");
        setIsPopupOpen(false); 

      } else {
        setInputValue("");    
        setError('No data found for the search query.'); 
        setIsPopupOpen(true);
      }
    } catch (error) {
      setInputValue("");
      setError('An error occurred while searching. Please try again.'); 
      setIsPopupOpen(true);
    }
  };

  const handleModalInputChange1 = (e) => {
    setInputValue1(e.target.value); 
  };

  const handleModalInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleStorageAccountNameChange = (e) => {
    const accName = e.target.value.toLowerCase();
    setNewStorageFieldName(accName);
  };

  const handleAccountNameChange = (e) => {
    const accName = e.target.value.toLowerCase();
    setNewFieldName(accName);
  };

  const handleAccountKeyChange = (e) => {
    const accKey = e.target.value.toLowerCase();
    setNewAccountKey(accKey);
  };

  const handleFilePathChange = (e) => {
    const accKey = e.target.value.toLowerCase();
    setNewFilePath(accKey);

  };
  const handleUploadButtonClick = async () => {
    setShowUploadPopup(true);

  };

  const handleBrowseClick = async () => {

    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.onchange = handleFileChange;
      fileInput.click();

    } catch (error) {
      console.error("Error in handleUploadButtonClick:", error);
      toast.error("Failed to upload file");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setFileName(file);
    }
  };

  const handleSampleFileDownload = async () => {
    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }
      const response = await fetch(
        `${API_URL}/api/admin/download-sample-column/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {

        const url = window.URL.createObjectURL(await response.blob());

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `downloaded-file.xlsx`); 
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      } else {
        toast.error(`Failed to initiate sample file download`);
      }
    } catch (error) {
      console.error("Error downloading sample file:", error);
      toast.error("Failed to download sample file");
    }
  };

  const handleUploadFile = async () => {
    if (!fileName) {
      setError("No file selected");
      setIsPopupOpen(true);
      return;
    }

    const browseFile = new FormData();
    browseFile.append("file", fileName);

    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }

      const response = await fetch(`${API_URL}/api/admin/upload-column/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: browseFile,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json(); 
      const message = "File uploaded successfully";

      setIsPopupOpen(true);
      setError(message);

      handleClearSelectedFile(); 
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);

      setError("Failed to upload file");
      setIsPopupOpen(true);
      setLoading(false); 
    }
  };

  const fetchStorageContainerData = async () => {
    setLoading(true);
    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }
      const response = await fetch(
        `${API_URL}/api/admin/list-storage-accounts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          const responseData = await response.json();
          if (responseData.error === "Access token has expired") {
            window.location.href = "/";
            return;
          }
        }
      }

      if (response.ok) {
        setContainerData(responseData.data);
        setIsStorageContainerModal(true);
        setShowPreview(true);
        setLoading(false);

      } else {
        console.error(
          "Error fetching storage container data:",
          responseData.message
        );
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {

    if (selectedOption === "Storage Container") {
      fetchStorageContainerData();
    }

  }, [token, selectedOption]);

  useEffect(() => {

  }, [containerData]);

  const handleDownloadOptionChange = async (selectedOption) => {

    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }
      setShowDownloadOptions(false);

      let configType, requestBody;

      if (selectedOption === "Global") {
        configType = "global";
        requestBody = { config_type: configType };
      } else if (selectedOption === "Local") {
        configType = "file_specific";
        requestBody = { config_type: configType };
      }
      const response = await fetch(`${API_URL}/api/admin/download-column/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {

        const url = window.URL.createObjectURL(await response.blob());

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `downloaded-${configType}-file.xlsx`);
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        setLoading(false);
      } else {
        console.error(
          `Error in download request for ${configType}:`,
          response.status
        );
        toast.error(`Failed to initiate download for ${configType}`);
      }
    } catch (error) {
      console.error("Error in handleDownloadOptionChange:", error);
      toast.error("Failed to initiate download");
    }
  };

  const handleCheckboxChange = (selectedContainer) => {

    const updatedContainerData = containerData.map((container) => {
      if (container === selectedContainer) {

        return {
          ...container,
          is_download_storage: !container.is_download_storage,
        };
      } else {

        return { ...container, is_download_storage: false };
      }
    });

    setContainerData(updatedContainerData);
  };

  const handleDownloadSaveButtonClick = async () => {
    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }
      if (!Array.isArray(downloadConfigApiData)) {
        console.error("Invalid downloadConfigApiData format");
        return;
      }

      const requestBody = {
        global_column_config: [
          ...downloadConfigApiData.map((config) => ({
            id: config.id,
            name: config.name,
            is_masked: JSON.parse(config.is_masked),
          })),
          ...(newFieldName.trim() !== ""
            ? [
                {
                  id: "",
                  name: newFieldName,
                  is_masked: newFieldIsMasked,
                },
              ]
            : []),
        ],
      };

      const response = await fetch(
        `${API_URL}/api/admin/update-global-column/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();

      if (response.ok) {

        setDownloadConfigApiData(responseData.updatedColumnData);
        setLoading(false);

        fetchDownloadConfigData();
        setNewFieldName("");
        setNewFieldIsMasked(false);

        setisNewFieldVisible(false);
      } else {
        console.error(
          "Error updating global column config:",
          responseData.message
        );
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const debouncedSaveChanges = useCallback(
    debounce(() => {
      if (token) {
        handleDownloadSaveButtonClick();
      } else {
        console.error("Token is not available");
      }
    }, 1000),
    [token]
  );

  const handleDownloadConfigFieldChange = (index, field, value) => {

    setDownloadConfigApiData((prevData) => {
      const newData = prevData.map((config, i) => {

        if (i === index) {
          return {
            ...config,
            id: config.id,
            name: field === "name" ? value : config.name,
            is_masked:
              field === "is_masked" ? value === "true" : config.is_masked,
          };
        }

        return config;
      });

      return newData;
    });

  };

  useEffect(() => {

  }, [downloadConfigApiData]);

  const handleAddNewField = () => {
    if (!newFieldName || newFieldName.trim() === '') {

      return;
    }

    const existingRowIndex = downloadConfigApiData.findIndex(
      (column) => column.isEditing
    );

    if (existingRowIndex !== -1) {

      const updatedColumnData = [...downloadConfigApiData];
      const existingRow = updatedColumnData[existingRowIndex];
      existingRow.field_name = newFieldName;
      existingRow.is_masked = newFieldIsMasked;
      existingRow.isEditing = false;
      setDownloadConfigApiData(updatedColumnData);
    } else {

      const defaultBlobPrefix = ""; 

      const existingBlobPrefix =
        columnData.length > 0 ? columnData[0].blob_prefix : defaultBlobPrefix;

      const newField = {
        id: "",

        name: newFieldName,
        is_masked: newFieldIsMasked,
        showDeleteButton: true,

      };

      setDownloadConfigApiData((prevDownloadApiData) => [
        ...prevDownloadApiData,
        newField,
      ]);
    }

    setNewFieldName("");
    setNewFieldIsMasked(false);
    setisNewFieldVisible(true);
  };

  useEffect(() => {
    if (isNewFieldVisible && newFieldRef.current) {
      newFieldRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isNewFieldVisible]);

  const handleAddStorageNewField = async () => {
    try {
      if (!newFieldName.trim()) {
        return; 
      }

      const existingRowIndex = containerData.findIndex(
        (column) => column.isEditing
      );

      if (existingRowIndex !== -1) {

        const updatedContainerData = [...containerData];
        const existingRow = updatedContainerData[existingRowIndex];
        existingRow.account_name = newFieldName;
        existingRow.account_key = newAccountKey;
        existingRow.isEditing = false;
        setContainerData(updatedContainerData);
      } else {

        const newField = {
          id: containerData.length + 1, 
          account_name: newFieldName,
          account_key: newAccountKey,
          showDeleteButton: true,

        };

        setContainerData((prevContainerData) => [
          ...prevContainerData,
          newField,
        ]);
      }

      setNewFieldName("");
      setNewAccountKey("");
      setisNewFieldVisibleStorage(true);
    } catch (error) {
      console.error("Add new storage field error:", error);
      toast.error("Failed to add new storage field");
    }
  };

  const fetchFileSharesData = async () => {
    setLoading(true);
    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }
      const response = await fetch(`${API_URL}/api/admin/list-file-shares/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}), 
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          const responseData = await response.json();
          if (responseData.error === "Access token has expired") {
            window.location.href = "/";
            return;
          }
        }
      }

      if (response.ok) {
        setFileShareData(responseData.data);
        setIsFileContainerModal(true);
        setShowPreview(true);
        setLoading(false);

      } else {
        console.error(
          "Error fetching storage container data:",
          responseData.message
        );
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {

    if (selectedOption === "File Share") {
      fetchFileSharesData();
    }

  }, [token, selectedOption]);

  const handleFileShareDataChange = (index, field, value) => {

    const updatedModifiedFileShares = [...modifiedFileShares];
    updatedModifiedFileShares[index] = {
      ...updatedModifiedFileShares[index],
      [field]: value,
    };
    setModifiedFileShares(updatedModifiedFileShares);
  };

  const handleStorageAccountSave = async () => {
    try {
        if (!token) {
            console.error("Token is not available.");
            return;
        }

        if (isNewFieldVisibleStorage && (!newFieldName.trim() || !newAccountKey.trim())) {
            toast.error("Please enter values for Field Name and Account key.");
            return;
        }

        const newField = isNewFieldVisibleStorage
            ? {
                id: null,
                account_name: newFieldName,
                account_key: newAccountKey,
                is_download_storage: false,
            }
            : null;

        const requestBody = {
            storage_account_data: [
                ...containerData.map((container) => ({
                    id: container.id,
                    account_name: container.account_name,
                    account_key: container.account_key,
                    is_download_storage: container.is_download_storage,
                })),
                ...(newField ? [newField] : []),
            ],
        };

        const response = await fetch(`${API_URL}/api/admin/update-storage-accounts/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                storage_account: requestBody.storage_account_data,
            }),
        });

        const data = await response.json();

        if (Array.isArray(data.data)) {
            setContainerData(data.data);
            setModifiedFileShares([]);
            setNewFieldName(null);
            setNewAccountKey(null);
            setisNewFieldVisibleStorage(false);
            setIsDeleteButtonVisible(false);
            setLoading(false);
        } else {
            console.error("Invalid storage_account_data:", data.data);
        }
        if (response.ok) {
          setError("Storage account saved successfully!");
          setIsPopupOpen(true);

        } else {
          console.error("Failed to save storage account.");
        }

        setIsSaveClicked(true);

    } catch (error) {
        console.error("Error saving storage accounts:", error);
    }
};

  const handleFileShareSaveButtonClick = async () => {

    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }

      if (!newFieldName.trim() || !newFilePath.trim()) {
        toast.error("Please enter values for Field Name and File Path.");
        return;
      }

      const requestBody = {
        file_shares: [
          ...fileShareData.map((fileshare) => ({
            id: fileshare.id,
            name: fileshare.name,
            filepath: fileshare.filepath,
            sync_status: "NOT_STARTED",
            sync_start_time: "",
            sync_end_time: "",
          })),
          {
            id: null,
            name: newFieldName,
            filepath: newFilePath,
            sync_status: "NOT_STARTED",
            sync_start_time: "",
            sync_end_time: "",
          },
        ],
      };

      const response = await fetch(`${API_URL}/api/admin/update-file-shares/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (Array.isArray(data.data)) {

        setFileShareData(data.data);

        setNewFieldName("");
        setNewFilePath("");

        setModifiedFileShares([]);
        setNewFileShares([]);
        setIsDeleteButtonVisible(false);
        setLoading(false);
        setNewFilePath("");

        setNewFilePath((prevFilePath) =>
          saveButtonClicked ? "*".repeat(prevFilePath.length) : prevFilePath
        );

        setSaveButtonClicked(true);
        setisNewFieldVisibleFileShare(false);
      } else {
        console.error("Invalid file_shares data:", data.file_shares);
      }
    } catch (error) {
      console.error("Error saving file shares:", error);
    }
  };

  useEffect(() => {}, [fileShareData]);

  const handleFileShareRefresh = async (fileshare) => {

    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }

      setError(`Sync is in progress for ${fileshare.name}`);
      setIsPopupOpen(true);

      const response = await fetch(
        `${API_URL}/api/admin/sync-file-shares/${fileshare.id}/`,
        {
          method: "POST",
        }
      );

      if (response.ok) {

        setFileShareSyncStatus((prev) => ({
          ...prev,
          [fileshare.id]: "pending",
        }));

        setFileShareSyncStatus((prev) => ({
          ...prev,
          [fileshare.id]: "success", 
        }));

        setError(`Sync is Success for ${fileshare.name}`);
        setIsPopupOpen(true);
      } else {

        setFileShareSyncStatus((prev) => ({
          ...prev,
          [fileshare.id]: "failed",
        }));

        setError(`Sync is Failed for ${fileshare.name}`);
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error("Error during sync:", error);

    }
  };

  const handleRefresh = async (container) => {
    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }

      setError(`Sync is in progress for ${container.account_name}`);
      setIsPopupOpen(true);

      const requestBody = {
        storage_account_name: "azuredatasec",
      };
      const response = await fetch(
        `${API_URL}/api/core/refresh_storage_account/`,

        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {

        setStorageContainerSyncStatus((prev) => ({
          ...prev,
          [container.id]: "pending",
        }));

        setStorageContainerSyncStatus((prev) => ({
          ...prev,
          [container.id]: "success", 
        }));

        setError(`Sync is completed for ${container.account_name}`);
        setIsPopupOpen(true);
      } else {

        setStorageContainerSyncStatus((prev) => ({
          ...prev,
          [container.id]: "failed",
        }));

        setError(`Failed to sync ${container.account_name}`);
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error("Error during sync:", error);

    }
  };

  const handleRowClick = (container) => {
    setSelectedContainer(container);

    const checkbox = document.getElementById(
      `checkbox-${container.container_id}`
    );
    if (checkbox) {
      checkbox.click();
    }

  };

  const handleFileShareRowClick = (fileshare) => {
    setSelectedContainer(fileshare);

    const checkbox = document.getElementById(`checkbox-${fileshare.id}`);
    if (checkbox) {
      checkbox.click();
    }

  };

  const handleuserRowClick = (index) => {
    const clickedGroup = userGroupsData[index];
    setSelectedUserGroup(clickedGroup);
    const checkbox = document.getElementById(
      `checkbox-${clickedGroup.group_id}`
    );
    if (checkbox) {
      checkbox.click();
    }
  };

  const handleDeleteClick = async (userGroupId) => {

    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }

      const response = await fetch(
        `${API_URL}/api/core/blob-groups/${userGroupId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",

          },
        }
      );

      if (response.ok) {

        const updatedUserGroups = userGroupsData.filter(
          (group) => group.id !== userGroupId
        );
        setUserGroupsData(updatedUserGroups);
        setSelectionUserGroupDeletion(null);
        setLoading(false);
      } else {

        console.error("Failed to delete the user group");
      }
    } catch (error) {
      console.error("Error occurred during delete:", error);
    }
  };

  const handleDeleteField = (fieldId, fieldName) => {

    setDownloadConfigApiData((prevDownloadApiData) => {

      if (prevDownloadApiData) {

        const filteredData = prevDownloadApiData.filter((field) => {
          return !(field.id === fieldId && field.name === fieldName);
        });

        return filteredData;
      } else {

        return [];
      }
    });
  };

  const handleContainerDataChange = (index, field, value) => {
    setContainerData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const toggleAccountKeyVisibility = (index) => {
    setContainerData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        showActualKey: !newData[index].showActualKey,
      };
      return newData;
    });
  };

  const toggleFilePathVisibility = (index) => {
    setFileShareData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        showActualKey: !newData[index].showActualKey,
      };
      return newData;
    });
  };

  const closePreviewModal = () => {
    document.body.style.overflow = "visible";
    setSelectedItems([]);
    setNewFieldIsMasked(false)
    setNewFilePath(null)
    setIsPopupOpen(false);
    setIsModalOpen(false);
    setShowPreview(false);
    setDataType(null);
    setIsEditUserModalOpen(false);
    setIsAddUserGroup(false);
    setIsStorageContainerModal(false);
    setIsFileShareModal(false);
    setIsMiscellaneousModal(false);
    setIsGlobalColumnModal(false);
    setisNewFieldVisibleStorage(false);
    setIsTimezoneModalOpen(false);
    setisNewFieldVisible(false);
    setInputValue1(null);
    setInputValue2(null);
    setNewFieldName(null);
    setisNewFieldVisibleFileShare(false);
    setInput1Error(null)

  };

  const closeGlobalPreviewModal = () => {
    setIsPopupOpen(false);  
    setInputValue('');      
    fetchDownloadConfigData(''); 
  };

  const handleClosePopup = () => {
    closePreviewModal();       
    closeGlobalPreviewModal(); 
  };

  const handleAzureInputChange = (e) => {

    setTextInputValue(e.target.value);
  };

  const handleEditModalInputChange = (e) => {
    const { name, value } = e.target;

    setEditedUserGroup(prevState => ({
        ...prevState,  
        [name]: value 
    }));
};

  const handleListUsergroups = () => {
    const promises = [
      fetch(`${API_URL}/api/core/blob-groups/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",

        },
      }).then((response) => response.json()),

    ];

    Promise.all(promises)
      .then((data) => {
        if (data.length > 0) {
          setAvailableItems(data[0]);
          setModalVisible(true);
          document.body.style.overflow = "hidden";
          setShowPreview(true);
          setDataType("AddUser");
          setLoading(false);
        } else {
          console.error("No data received from API for Preview.");
        }
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  };

  const handleItemClick = (item, event) => {
    const isCtrlPressed = event.ctrlKey || event.metaKey;

    setSelectedItems((prevSelectedItems) => {
      if (isCtrlPressed) {

        if (prevSelectedItems.includes(item)) {

          return prevSelectedItems.filter(
            (selectedItem) => selectedItem !== item
          );
        } else {

          return [...prevSelectedItems, item];
        }
      } else {

        return [item];
      }
    });
  };

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
    } else {

      isMounted.current = false;
    }
  }, [selectedItems]);

  const handleChosenItemClick = (item, event) => {

    const isCtrlPressed = event.ctrlKey || event.metaKey;

    setChosenItems((prevChosenItems) => {
      if (isCtrlPressed) {

        if (prevChosenItems.includes(item)) {

          return prevChosenItems.filter((chosenItem) => chosenItem !== item);
        } else {

          return [...prevChosenItems, item];
        }
      } else {

        return [item];
      }
    });
  };

  const handleMoveToRight = () => {

    if (selectedItems.length > 0) {

      setChosenItems((prevChosenItems) => {

        const updatedChosenItems = [...prevChosenItems, ...selectedItems];

        const uniqueChosenItems = Array.from(new Set(updatedChosenItems));

        console.log("uniqueChosenItems ", uniqueChosenItems);

        return uniqueChosenItems;
      });

      setAvailableItems((prevAvailableItems) => {

        return prevAvailableItems.filter(
          (item) => !selectedItems.includes(item)
        );
      });

      setSelectedItems([]);
    }

    setTimeout(() => {}, 0);

    console.log("Triggered last ", chosenItems);
  };

  const handleUserPermissions = () => {
    const promises = [
      fetch(`${API_URL}/api/core/blob-roles/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",

        },
      }).then((response) => response.json()),

    ];

    Promise.all(promises)
      .then((data) => {

        if (data.length > 0) {
          setAvailableItems(data[0]);

          setChosenItems(new Set());
          setModalVisible(true);
          setIsAddUserGroup(true);
          document.body.style.overflow = "hidden";
          setShowPreview(true);
          setDataType("AddUser");
          setLoading(false);
        } else {
          console.error("No data received from API for Preview.");
        }
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  };

  useEffect(() => {
    setChosenItems([]);

    setIsAddUserGroup(true);
  }, []);

  useEffect(() => {}, [availableItems]);

  useEffect(() => {}, [chosenItems]);

  useEffect(() => {

    handleUserPermissions();

  }, []);

  const handleMoveToLeft = () => {

    if (selectedItems.length > 0) {

      setEditedUserGroup((prevEditedUserGroup) => {
        const prevRoles = Array.isArray(prevEditedUserGroup?.roles)
          ? prevEditedUserGroup.roles
          : [];

        const updatedRoles = prevRoles.filter(
          (role) => !selectedItems.some((selectedItem) => selectedItem.id === role.id)
        );

        return {
          ...prevEditedUserGroup,
          roles: updatedRoles,
        };
      });

      setAvailableItems((prevAvailableItems) => {

        const filteredAvailableItems = prevAvailableItems.filter(
          (item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id)
        );

        const updatedAvailableItems = [
          ...filteredAvailableItems,
          ...selectedItems,
        ];

        const uniqueAvailableItems = Array.from(
          new Set(updatedAvailableItems.map((item) => item.id))
        ).map((id) => updatedAvailableItems.find((item) => item.id === id));

        return uniqueAvailableItems;
      });

      setChosenItems((prevChosenItems) => {
        const currentChosenItems = Array.isArray(prevChosenItems)
          ? prevChosenItems
          : [];

        const updatedChosenItems = currentChosenItems.filter(
          (item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id)
        );

        return updatedChosenItems;
      });

      setSelectedItems([]);
    }

    setTimeout(() => {}, 0);
  };

  const handleDcGroupsChange = (index, value) => {
    setUserGroupsData((prevUserGroupsData) => {
      const updatedUserGroupsData = [...prevUserGroupsData];
      updatedUserGroupsData[index].dcgroups = value;
      return updatedUserGroupsData;
    });
  };

  const handleClick = (groupId) => {

    if (groupId) {
      handleEditUserPermissions(groupId);
    } else {
      console.error("Invalid groupId:", groupId);
    }
  };

  useEffect(() => {
    handleClick();

  }, []);

  const handleEditUserPermissions = (groupId) => {

    const promises = [
      fetch(`${API_URL}/api/core/blob-groups/${groupId}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",

        },
      }).then((response) => response.json()),

    ];

    Promise.all(promises)
      .then((data) => {
        if (data.length > 0) {
          console.log("data now ", data)
          setEditedUserGroup(data[0]);

          setModalVisible(true);
          document.body.style.overflow = "hidden";
          setShowPreview(true);
          setDataType("EditUser");
          setIsEditing(true);
          setLoading(false);
          console.log("edited usergroup", editedUserGroup);
        } else {
          console.error("No data received from API for Preview.");
        }
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  };

  const handleEditDcGroupsChange = (index, value) => {
    setEditedUserGroup((prevGroup) => {

      const updatedGroup = { ...prevGroup };

      if (!Array.isArray(updatedGroup.dcgroups)) {
        updatedGroup.dcgroups = [];
      }

      updatedGroup.dcgroups = [
        ...updatedGroup.dcgroups.slice(0, index),
        value,
        ...updatedGroup.dcgroups.slice(index + 1)
      ];

      return updatedGroup; 
    });
  };

  const handleUserGroupSave = async () => {
    try {
      const url =
        editedUserGroup && editedUserGroup?.id
          ? `${API_URL}/api/core/blob-groups/${editedUserGroup.id}/`
          : `${API_URL}/api/core/blob-groups/create/`;

      const method = editedUserGroup && editedUserGroup?.id ? "PUT" : "POST";

      let dcgroupsValue =
        method === "POST" ? inputValue2 : editedUserGroup?.dcgroups;

      if (!Array.isArray(dcgroupsValue)) {
        dcgroupsValue = [dcgroupsValue];
      }

      const selectedItemsArray = Array.isArray(selectedItems)
        ? selectedItems
        : [];

      const chosenItemsArray = Array.isArray(chosenItems)
        ? chosenItems
        : Array.from(chosenItems);

      const uniqueSelectedItems = Array.from(
        new Set([...chosenItemsArray, ...selectedItemsArray])
      );

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roles: uniqueSelectedItems,
          name: method === "POST" ? inputValue1 : editedUserGroup.name,
          description: "admin",
          dcgroups: dcgroupsValue.join(","),
        }),
      });

      localStorage.setItem("chosenItems", JSON.stringify(uniqueSelectedItems));

      if (response.ok) {

        const data = await response.json();
        setResponseMessage(data.message);

        fetchData();

        setUserGroupsData((prevState) => {
          const prevData = Array.isArray(prevState) ? prevState : [];

          if (
            data.data &&
            Array.isArray(data.data) &&
            typeof data.data === "object"
          ) {

            const editedIndex = prevData.findIndex(
              (group) => group.id === editedUserGroup?.id
            );

            setChosenItems([...chosenItems]);

            if (editedIndex !== -1) {

              const updatedData = [...prevData];
              updatedData[editedIndex] = data.data[0]; 
              return updatedData;
            } else {

              return [...prevData, data.data[data.data.length - 1]];
            }
          } else {

            return prevData;
          }
        });

        setInputValue1("");
        setInputValue2("");
        setSelectedItems([]);
        setIsModalOpen(false);
        setChosenItems([]); 
        setDcGroups([]);
        closePreviewModal();
        setIsEditUserModalOpen(false);
        setLoading(false);
        setIsAddUserGroup(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to save user group:", errorData.message);
        setResponseMessage("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error occurred during save:", error);
      setResponseMessage("Error: Something went wrong.");
    }
  };

  const handleChooseAll = () => {

    setChosenItems([...chosenItems, ...availableItems]);
    setAvailableItems([]);

    setSelectedItems([]);

  };

  const handleRemoveAll = () => {

    setAvailableItems([...availableItems, ...chosenItems]);
    setChosenItems([]);

    setSelectedItems([]);
  };

const handleEditMoveToRight = () => {
  setChosenItems(prevChosen => [
    ...prevChosen,
    ...selectedItems.filter(item => !prevChosen.some(chosen => chosen.id === item.id))
  ]);
  setAvailableItems(prevAvailable => prevAvailable.filter(item => !selectedItems.some(selected => selected.id === item.id)));
  setSelectedItems([]);
};

const handleEditMoveToLeft = () => {
  setAvailableItems(prevAvailable => [
    ...prevAvailable,
    ...selectedItems.filter(item => !prevAvailable.some(available => available.id === item.id))
  ]);
  setChosenItems(prevChosen => prevChosen.filter(item => !selectedItems.some(selected => selected.id === item.id)));
  setSelectedItems([]);
};

const handleEditChooseAll = () => {

  setChosenItems((prevChosen) => {
    const currentChosenItems = Array.isArray(prevChosen) ? prevChosen : [];

    return [
      ...currentChosenItems,

      ...availableItems.filter(item => !currentChosenItems.some(chosen => chosen.id === item.id))
    ];
  });

  setAvailableItems([]);
};

const handleEditRemoveAll = () => {

 const allChosenItems = [...chosenItems]; 

 if (allChosenItems.length > 0) {

   setEditedUserGroup((prevEditedUserGroup) => {
     const prevRoles = Array.isArray(prevEditedUserGroup?.roles)
       ? prevEditedUserGroup.roles
       : [];

     const updatedRoles = prevRoles.filter(
       (role) => !allChosenItems.some((chosenItem) => chosenItem.id === role.id)
     );

     return {
       ...prevEditedUserGroup,
       roles: updatedRoles,
     };
   });

   setAvailableItems((prevAvailableItems) => {

     const filteredAvailableItems = prevAvailableItems.filter(
       (item) => !allChosenItems.some((chosenItem) => chosenItem.id === item.id)
     );

     const updatedAvailableItems = [
       ...filteredAvailableItems,
       ...allChosenItems,
     ];

     const uniqueAvailableItems = Array.from(
       new Set(updatedAvailableItems.map((item) => item.id))
     ).map((id) => updatedAvailableItems.find((item) => item.id === id));

     return uniqueAvailableItems;
   });

   setChosenItems([]); 

   setSelectedItems([]);

   setTimeout(() => {
     console.log("All Chosen Items Moved to Available Items");
   }, 0);
 }
};

useEffect(() => {
  const chosenItemsArray = Array.from(chosenItems);

  const filtered = availableItems.filter(item => !chosenItemsArray.some(chosen => chosen.id === item.id));

  setFilteredItems(filtered);
}, [chosenItems, availableItems]);

const addItemToChosen = (item) => {
  setChosenItems(prevChosen => new Set(prevChosen).add(item));
};

const removeItemFromChosen = (item) => {
  setChosenItems(prevChosen => {
    const newSet = new Set(prevChosen);
    newSet.delete(item);
    return newSet;
  });
};

  useEffect(() => {
    if (editedUserGroup && Array.isArray(editedUserGroup.roles)) {
      setChosenItems(new Set(editedUserGroup.roles));
    }
  }, [editedUserGroup]);

  useEffect(() => {
    console.log("fileter",filteredItems)
  }, [filteredItems]);

  const handleTimezoneOptionClick = (option) => {
    setSelectedTimeZone(option);
    setIsTimezoneDropdownOpen(false);

  };

  const handleAddMoveToLeft = () => {

    setAvailableItems([...availableItems, ...selectedItems]);
    setChosenItems(chosenItems.filter((item) => !selectedItems.includes(item)));
    setSelectedItems([]);
  };

  const handleAddSaveClick = () => {
    let hasError = false;

    const inputString = String(inputValue1).trim();

    if (inputString === '') {
        setInput1Error('Please fill the field');
        hasError = true;
    }

    if (!hasError) {
        handleUserGroupSave();
    }
};

  const renderAddUserGroup = () => {

    const addUserModalWidth = (width * 0.66).toFixed(2);
    const addUserModalHeight = (height * 0.86).toFixed(2);
    const inputContainerWidth = (addUserModalWidth * 0.99).toFixed(2);
    const inputContainerHeight = (addUserModalHeight * 0.08).toFixed(2);
    const permissionsContainerWidth = (addUserModalWidth * 0.99).toFixed(2);
    const permissionContainerHeight = (addUserModalHeight * 0.65).toFixed(2);
    const authContainerWidth = (addUserModalWidth * 0.99).toFixed(2);
    const authContainerHeight = (addUserModalHeight * 0.12).toFixed(2);
    return (
      <div
        className=" flex flex-col items-center   "
        style={{
          width: `${addUserModalWidth}px`,
          height: `${addUserModalHeight}px`,
        }}
      >
        <div
          className="bg-purpleshade1  flex flex-row justufy-between items-center   "
          style={{
            width: `${addUserModalWidth}px`,
            height: `${inputContainerHeight}px`,
          }}
        >
          <div
            className="flex flex-row justify-between items-center px-3"
            style={{
              width: `${addUserModalWidth}px`,
              height: `${inputContainerHeight}px`,
            }}
          >
            <h2 className="font-[400] text-white text-xs">Add UserGroup</h2>
            <div className="flex flex-row items-center space-x-5 ">
              <label className="text-xs text-white">Name</label>

              <input
                className={`outline-none p-1 font-base text-xs rounded-sm h-6
                  ${input1Error ? 'text-red-500 border-red-500 placeholder-red-500' : 'text-black border-gray-300'}`}
                type="text"
                name="name"
                value={input1Error ? '' : inputValue1} 
              onChange={(e) => {
                handleModalInputChange1(e)

                setInput1Error(''); 
              }}
              placeholder={input1Error || 'User Group Name'}  

              required

                autoComplete="off"
                autoFocus
                style={{ position: "relative", zIndex: 1 }} 
              />
              <button
                className=" text-2xl font-semibold text-white "
                onClick={closePreviewModal}
              >
                &times;
              </button>
              {}
            </div>
          </div>
        </div>
        <div
          className="  flex flex-row justify-between items-center px-10"
          style={{
            width: `${addUserModalWidth}px`,
            height: `${inputContainerHeight}px`,
          }}
        >
          <h1 className=" font-[400] text-xs ">Permissions</h1>
          {}
        </div>

        <div
          className=" flex flex-col justify-between items-center px-3 mt-2"
          style={{
            width: `${permissionsContainerWidth}px`,
            height: `${permissionContainerHeight}px`,
          }}
        >
          <div
            className="flex flex-col space-y-2"
            style={{
              width: `${(permissionsContainerWidth * 0.97).toFixed(2)}px`,
              height: `${(permissionContainerHeight * 0.98).toFixed(2)}px`,
            }}
          >
            <div
              className="flex flex-row items-center justify-evenly space-x-6 "
              style={{
                width: `${(permissionsContainerWidth * 0.97).toFixed(2)}px`,
                height: `${(permissionContainerHeight * 0.9).toFixed(2)}px`,
              }}
            >
              <div className="flex flex-col">
                <div>
                  <div className="flex flex-row w-64 space-x-1 items-center justify-center h-8 rounded-t-lg bg-purpleshade1 ">
                    <h1 className=" p-1 text-white text-xs">
                      Available Permission
                    </h1>
                  </div>
                  <div
                    className="p-3 w-64 h-[220px] bg-white flex flex-col overflow-y-auto overflow-x-auto border border-[#C0C0C0] rounded-b-md"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    {availableItems.map((item, index) => (
                      <div
                        className="flex flex-col space-y-3 font-light py-0.5 text-xs "
                        key={index}
                        onClick={(event) => handleItemClick(item, event)}
                        style={{
                          cursor: "pointer",

                          background: selectedItems.includes(item)
                            ? "#DCD9FF"
                            : "transparent",
                        }}
                      >
                        {item.description}
                      </div>
                    ))}
                  </div>
                </div>
                {}
                <div className="flex justify-end w-68 items-center h-8  ">
                  <button
                    className="w-28 h-6  rounded  cursor-pointer mt-1 font-medium text-xs bg-white text-black"
                    onClick={handleChooseAll}
                  >
                    Choose All
                  </button>{" "}
                </div>
              </div>
              <div className="flex flex-col h-80 w-5  space-y-4 items-center justify-center ">
                <button className="arrow-buttons" onClick={handleMoveToRight}>
                  <FontAwesomeIcon icon={faCircleRight} size="lg" />
                </button>
                <button className="arrow-buttons" onClick={handleAddMoveToLeft}>
                  <FontAwesomeIcon icon={faCircleLeft} size="lg" />
                </button>
              </div>
              <div className="flex flex-col  ">
                <div className="flex flex-row w-64 space-x-1 items-center justify-center h-8 rounded-t-md bg-purpleshade1 text-white ">
                  <h1 className=" p-1 text-white text-xs">Chosen Permission</h1>
                </div>
                <div
                  className="p-3 w-64 h-[220px] bg-white flex flex-col overflow-y-auto overflow-x-auto border border-[#C0C0C0] rounded-b-md"
                  style={{ scrollbarWidth: "thin" }}
                >

                  {chosenItems &&
                    Array.isArray(chosenItems) &&
                    chosenItems.map((item, index) => (
                      <div
                        className="flex flex-col space-y-3 font-light p-0.5 text-xs "
                        key={index}
                        onClick={(event) => handleItemClick(item, event)}
                        style={{
                          cursor: "pointer",
                          background: selectedItems.includes(item)
                            ? "#76E8CD"
                            : "transparent",
                        }}
                      >
                        {item.description}
                      </div>
                    ))}
                </div>
                <div className="w-68 h-9 justify-end flex">
                  <button
                    className="w-28 h-6  rounded  cursor-pointer mt-1 font-medium text-xs bg-white text-black"
                    onClick={handleRemoveAll}
                  >
                    Remove All
                  </button>
                </div>
              </div>
            </div>
            <hr className="w-[98%]  bg-[#C0C0C0]  ml-2" />
          </div>
        </div>

        <div
          className=" flex flex-col space-y-2"
          style={{
            width: `${authContainerWidth}px`,
            height: `${authContainerHeight}px`,
          }}
        >
          <h2 className="font-normal text-sm   px-8">SAML Authentication</h2>
          <div className="flex flex-row space-x-5 mt-3  px-8">
            <label className="text-xs">Azure Group</label>
            <div>:</div>
            <input
              className="border border-[#D9DADF] outline-none p-1 font-light text-xs 
                w-[80%]  pt-2 text-justify  pb-2 h-8 overflow-ellipsis cursor-default"
              type="text"
              name="name"
              value={inputValue2}
              onChange={(e) => handleModalInputChange2(e)}
              textarea={true}
            />
          </div>
        </div>
        <div className="w-[96%] h-7 flex justify-end mt-3  mr-4">
          <button
            className="w-20 h-7 items-end rounded-lg cursor-pointer font-semibold text-xs bg-purpleshade1 text-white"

            onClick={handleAddSaveClick}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  const getFilteredItems = () => {
    return isEditing
      ? availableItems.filter(
          (item) =>
            !editedUserGroup.roles.some((role) => role.id === item.id)
        )
      : availableItems;
  };

  useEffect(() => {
    console.log("Available Items: ", availableItems,isEditing, chosenItems);
  }, [availableItems]);  

 useEffect(() => {
    if (!editedUserGroup) return;

    const newFilteredItems = isEditing
        ? availableItems.filter(
              item => !editedUserGroup.roles.some(role => role.id === item.id)
          )
        : availableItems;

    console.log("New Filtered Items:", newFilteredItems);
    setFilteredItems(newFilteredItems);
}, [availableItems, editedUserGroup, isEditing]);

useEffect(() => {
  console.log("Available Items:", availableItems);
  console.log("Edited User Group Roles:", editedUserGroup);
  console.log("Filtered Items:", filteredItems);
}, [availableItems, editedUserGroup, isEditing]);

const renderItems = (items, handleClick, isChosen = false) => {
  return items.map((item, index) => (
      <div
          key={index}
          className="flex flex-col space-y-3 font-light text-xs p-0.5"
          onClick={(event) => handleClick(item, event)}
          style={{
              cursor: "pointer",
              background: selectedItems.includes(item) ? "#DCD9FF" : "transparent",
          }}
      >
          {item.description}
      </div>
  ));
};

  const renderEditUserGroup = () => {

    let item = {};

    const addUserModalWidth = (width * 0.66).toFixed(2);
    const addUserModalHeight = (height * 0.86).toFixed(2);
    const inputContainerWidth = (addUserModalWidth * 0.99).toFixed(2);
    const inputContainerHeight = (addUserModalHeight * 0.08).toFixed(2);
    const permissionsContainerWidth = (addUserModalWidth * 0.99).toFixed(2);
    const permissionContainerHeight = (addUserModalHeight * 0.65).toFixed(2);
    const authContainerWidth = (addUserModalWidth * 0.99).toFixed(2);
    const authContainerHeight = (addUserModalHeight * 0.12).toFixed(2);
    console.log("availableItems:", availableItems);
    console.log("editedUserGroup:", editedUserGroup);
    console.log("Chosen Items:", Array.from(chosenItems));

    if (!editedUserGroup) {
        return 

    }

    const filteredItems = isEditing
    ? availableItems.filter(item => !editedUserGroup.roles.some(role => role.id === item.id))
    : availableItems;

    console.log("Filtered Items:", filteredItems);
    return (
      <div>
        {editedUserGroup && (
          <>
            <div
              className=" flex flex-col items-center   "
              style={{
                width: `${addUserModalWidth}px`,
                height: `${addUserModalHeight}px`,
              }}
            >
              <div
                className="bg-purpleshade1  flex flex-row justufy-between items-center   "
                style={{
                  width: `${addUserModalWidth}px`,
                  height: `${inputContainerHeight}px`,
                }}
              >
                <div
                  className="flex flex-row justify-between items-center px-3"
                  style={{
                    width: `${addUserModalWidth}px`,
                    height: `${inputContainerHeight}px`,
                  }}
                >
                  <h2 className="font-[400] text-white text-xs">
                    Edit UserGroup
                  </h2>
                  <div className="flex flex-row items-center space-x-5 ">
                    <label className="text-xs text-white">Name</label>

                    <input
                      className="outline-none p-1 font-light text-xs rounded-sm h-6"
                      type="text"
                      name="name"
                      value={editedUserGroup.name}
                      onChange={handleEditModalInputChange}
                    />
                    <button
                      className=" text-2xl font-semibold text-white "
                      onClick={closePreviewModal}
                    >
                      &times;
                    </button>
                    {}
                  </div>
                </div>
              </div>
              <div
                className="  flex flex-row justify-between items-center px-10"
                style={{
                  width: `${addUserModalWidth}px`,
                  height: `${inputContainerHeight}px`,
                }}
              >
                <h1 className=" font-[400] text-xs ">Permissions</h1>
                {}
              </div>

              <div
                className=" flex flex-col justify-between items-center px-3 mt-2"
                style={{
                  width: `${permissionsContainerWidth}px`,
                  height: `${permissionContainerHeight}px`,
                }}
              >
                <div
                  className="flex flex-col space-y-2"
                  style={{
                    width: `${(permissionsContainerWidth * 0.97).toFixed(2)}px`,
                    height: `${(permissionContainerHeight * 0.98).toFixed(
                      2
                    )}px`,
                  }}
                >
                  <div
                    className="flex flex-row items-center justify-evenly space-x-6 "
                    style={{
                      width: `${(permissionsContainerWidth * 0.97).toFixed(
                        2
                      )}px`,
                      height: `${(permissionContainerHeight * 0.9).toFixed(
                        2
                      )}px`,
                    }}
                  >
                    <div className="flex flex-col">
                      <div>
                        <div className="flex flex-row w-64 space-x-1 items-center justify-center h-8 rounded-t-lg bg-purpleshade1 ">
                          <h1 className=" p-1 text-white text-xs">
                            Available Permission
                          </h1>
                        </div>
                        <div
                          className="p-3 w-64 h-[220px] bg-white flex flex-col overflow-y-auto overflow-x-auto border border-[#C0C0C0] rounded-b-md"
                          style={{ scrollbarWidth: "thin" }}
                        >
                         {console.log("vailable",availableItems)}
                          {isEditing
                            ? availableItems
                                .filter(
                                  (item) =>
                                    !editedUserGroup.roles.some(
                                      (role) => role.id === item.id
                                    )
                                )
                                .map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col space-y-3 font-light text-xs p-0.5 "
                                    onClick={(event) =>
                                      handleItemClick(item, event)
                                    }
                                    style={{
                                      cursor: "pointer",

                                      background: selectedItems.includes(item)
                                        ? "#DCD9FF"
                                        : "transparent",
                                    }}
                                  >
                                    {item.description}
                                  </div>
                                ))
                            : availableItems.map((item, index) => (

                                <div
                                  key={index}
                                  className="flex flex-col space-y-3 font-light text-xs p-0.5 "
                                  id={`available-${item.id}`}
                                  onClick={(event) =>
                                    handleItemClick(item, event)
                                  }
                                  style={{
                                    cursor: "pointer",

                                    background: selectedItems.includes(item)
                                      ? "#DCD9FF"
                                      : "transparent",
                                  }}
                                >
                                  {item.description}
                                </div>
                              ))}

{}

                        </div>
                      </div>
                      <div className="flex justify-end w-68 items-center h-8  ">
                        <button
                          className="w-28 h-6  rounded  cursor-pointer font-medium text-xs bg-white text-black"
                          onClick={handleEditChooseAll}
                        >
                          Choose All
                        </button>{" "}
                      </div>
                    </div>
                    <div className="flex flex-col h-80 w-5  space-y-4 items-center justify-center ">
                      <button
                        className="arrow-buttons"
                        onClick={handleMoveToRight}
                      >
                        <FontAwesomeIcon icon={faCircleRight} size="lg" />
                      </button>
                      <button
                        className="arrow-buttons"
                        onClick={handleMoveToLeft}
                      >
                        <FontAwesomeIcon icon={faCircleLeft} size="lg" />
                      </button>
                    </div>
                    <div className="flex flex-col  ">
                      <div className="flex flex-row w-64 space-x-1 items-center justify-center h-8 rounded-t-md bg-purpleshade1 text-white ">
                        <h1 className=" p-1 text-white text-xs">
                          Chosen Permission
                        </h1>
                      </div>
                      <div
                        className="p-3 w-64 h-[220px] bg-white flex flex-col overflow-y-auto overflow-x-auto border border-[#C0C0C0] rounded-b-md"
                        style={{ scrollbarWidth: "thin" }}
                      >
                       {console.log("chosen",chosenItems)}
                        {}
                        {[...chosenItems].map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col space-y-3 font-light p-0.5 text-xs "
                          onClick={(event) => handleItemClick(item, event)}
                          style={{
                            cursor: "pointer",
                            background: selectedItems.some(
                              (selectedItem) => selectedItem.id === item.id
                            )
                              ? "#DCD9FF"
                              : "transparent",

                          }}
                        >
                          {item.name}
                        </div>
                      ))}

                      </div>
                      <div className="flex justify-end w-68 items-center h-8  ">
                        <button
                          className="w-28 h-6   rounded  cursor-pointer  font-medium text-xs bg-white text-black"
                          onClick={handleEditRemoveAll}
                        >
                          Remove All
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr className="w-[98%]  bg-[#C0C0C0]  ml-2" />
                </div>
              </div>

              <div
                className=" flex flex-col space-y-2"
                style={{
                  width: `${authContainerWidth}px`,
                  height: `${authContainerHeight}px`,
                }}
              >
                <h1 className="font-normal text-xs ml-3 px-8">
                  SAML Authentication
                </h1>
                {Array.isArray(editedUserGroup.dcgroups) ? (
                  editedUserGroup.dcgroups.map((groupId, index) => (
                    <div
                      key={index}
                      className="flex flex-row text-xs space-x-5 mt-3 ml-3 px-8"
                    >
                      <label className="text-sm">Azure Group</label>
                      <div>:</div>
                      <input
                        className="border w-[80%] border-lightgray-100 outline-none p-1 font-light text-xs"
                        type="text"
                        name={`dcgroups-${index}`}
                        value={groupId || ""}
                        onChange={(e) =>
                          handleEditDcGroupsChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-row space-x-5 mt-3 ml-3 px-8">
                    <label className="text-xs">Azure Group</label>
                    <div>:</div>
                    <input
                      className="border w-[80%] border-lightgray-100 outline-none p-1 font-light text-xs"
                      type="text"
                      name="dcgroups"
                      value={editedUserGroup.dcgroups || ""}
                      onChange={(e) =>
                        handleEditDcGroupsChange(0, e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
              <div className="w-[96%] h-7 flex justify-end mt-3  mr-4">
                <button
                  className="w-20 h-6 items-end rounded-lg cursor-pointer font-semibold text-xs bg-purpleshade1 text-white"
                  onClick={handleUserGroupSave} 
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const handleOptionClick = (option) => {

    setSelectedOption(option);
    if (
      option === "Storage Container" ||
      option === "File Share" ||
      option === "Global Column Config"
    ) {
      setIsModalOpen(false);
      setIsAddUserGroup(false);
      setIsEditUserModalOpen(false);
      setSelectionUserGroupDeletion(false);
    }
  };

  useEffect(() => {

  }, [selectedOption]);

  const handleTableSave = () => {
    handleStorageAccountSave(); 
  };

  const DownloadPopup = ({ onSelect, onClose }) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white px-4 py-2 rounded-lg shadow-top z-50 w-72 h-36  flex flex-col space-y-4 ml-56 ">
          <div className="flex justify-end">
            <button
              className="bg-background-100 text-2xl font-semibold "
              onClick={handlePopupClose}
            >
              <img
                src={process.env.PUBLIC_URL + "/closefile.png"}
                alt="close"
                className="h-4 w-4 "
              />
            </button>
          </div>
          <div className="flex flex-col space-y-4 items-center">
            <p className="font-medium text-sm  text-black ">Download ?</p>
            <div className="flex space-x-4 justify-center">
              <button
                className="w-24  h-6 flex flex-row p-1 ml-4 px-4 rounded-md cursor-pointer
             justify-center items-center font-medium text-[13px] bg-purpleshade1 text-white "
                onClick={() => {
                  onSelect("Global");
                  onClose();
                }}
              >
                Global
              </button>
              <button
                className="w-24  h-6 p-1 flex flex-row  ml-4 px-4 rounded-md cursor-pointer
             justify-center items-center font-medium text-[13px] bg-purpleshade1 text-white"
                onClick={() => {
                  onSelect("Local");
                  onClose();
                }}
              >
                Local
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const GlobalNewFieldPopup = ({ onClose, onSave }) => {
    const handleSave = () => {
      onSave(newFieldName, newFieldIsMasked);
      onClose();
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <input
              className="newinput w-full border border-gray-300 rounded p-2"
              type="text"
              placeholder="Enter Field Name"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4">
            <IsMaskedSwitch
              isMasked={newFieldIsMasked}
              onToggle={(isChecked) => setNewFieldIsMasked(isChecked)}
            />
            <label className="ml-2 text-sm">Is Masked</label>
          </div>
          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handlePopupClose = () => {

    setShowDownloadPopup(false);
  };

  const handleDownloadButtonClick = () => {
    setShowDownloadPopup(true);
  };

  const handleDownloadOptionSelect = async (option) => {
    try {

      await handleDownloadOptionChange(option);

      setShowDownloadPopup(false);
    } catch (error) {
      console.error("Error in handleDownloadOptionSelect:", error);
      toast.error("Failed to initiate download");
    }
  };

  const DeleteConfirmationPopup = ({ fileShare, onCancel, onConfirm }) => {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-top z-50 w-80 h-32 flex flex-col space-y-4 ml-56 mt-11">
          <p className="font-medium text-sm text-red-500">
            Are You Sure You want to Delete {fileShare.name}?
          </p>
          <div className="flex space-x-4 justify-center">
            <button
              className="w-20 h-7 bg-white text-black text-xs font-medium border border-black rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="w-20 h-7 bg-red-500 text-white text-xs font-medium rounded-lg"
              onClick={() => onConfirm(fileShare.id)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const UserDeleteConfirmationPopup = ({

    context,
    onCancel,
    onConfirm,
  }) => {

    const displayName = context.name || context.account_name || "the selected user";

    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 ml-56 mt-40">
        <div className="bg-white p-6 rounded-lg shadow-top z-50 w-[350px] h-[120px] flex flex-col items-center space-y-4">
          <p className="font-medium text-[11px] text-red-500">
            {}
            Are you sure you want to delete{' '}
            <span className="text-red-500">{displayName}</span>?

          </p>
          <div className="flex space-x-4 justify-center">
            <button
              className="w-20 h-7 bg-white text-black text-xs font-medium border border-black rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="w-20 h-7 bg-red-500 text-white text-xs font-medium rounded-lg"

              onClick={() => onConfirm(context)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleClearSelectedFile = () => {
    setSelectedFileName("");
  };

  const handleUploadPopupClose = () => {
    setShowUploadPopup(false);
  };

  const UploadPopup = ({}) => {
    return (

      <div className="fixed inset-0 flex justify-center items-center z-[9999]">
        <div
          className="bg-white shadow-md shadow-slate-500/30 cursor-pointer transition-right-0.3s ease-in-out shadow-top p-8"
          style={{
            width: "28vw",
            height: "80vh",
          }}
        >
          <div className="flex w-full justify-end">
            <button onClick={handleUploadPopupClose}>
              <img
                src={process.env.PUBLIC_URL + "/closefile.png"}
                alt="close"
                className="h-4 w-4"
              />
            </button>
          </div>

          <div className="flex flex-col w-full h-full  items-center space-y-5">
            <p className="text-sm">Upload</p>
            <div className="w-[80%] h-48 bg-purpleshadeL border border-dashed border-gray-100 flex flex-col items-center space-y-4 ">
              <img
                src={process.env.PUBLIC_URL + "/Upload-icon.png"}
                alt="uploadicon"
                className=" h-14 w-14 mt-6"
              />
              <p className="text-sm mt-5">
                Drag & drop files or{" "}
                <span
                  className="text-blue-800 underline"
                  onClick={handleBrowseClick}
                >
                  Browse
                </span>
              </p>
              <p className="text-[10px]">Supported formats: xlsx</p>
            </div>
            <div>
              <p className="text-xs">
                Download Sample xlsx
                <span
                  className="text-blue-800 underline ml-1"
                  onClick={handleSampleFileDownload}
                >
                  Files
                </span>
              </p>
            </div>

            <div className="w-[80%] h-9 text-sm flex flex-row border border-[#11AF22] rounded px-2  items-center justify-between">
              <input
                type="text"
                className="w-full h-8 outline-none"
                placeholder="your-file-here.PDF"
                value={selectedFileName}
                readOnly
              />

              <button onClick={handleClearSelectedFile}>
                <img
                  src={process.env.PUBLIC_URL + "/closefile.png"}
                  alt="close"
                  className="h-3 w-3"
                />
              </button>
            </div>

            <button
              className="w-[80%]  h-8 flex flex-row  px-4 rounded-sm cursor-pointer
                           justify-center items-center font-medium text-sm bg-purpleshade1
                          text-white  "
              onClick={handleUploadFile}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleCancelDelete = () => {
    setSelectedFileShareForDeletion(null);
    setSelectionUserGroupDeletion(null);
    setSelectedStorageRowForDeletion(null);
    setShowDownloadPopup(false);
  };

  const handleConfirmStorageDelete = async (storageaccountId) => {

    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }
      const response = await fetch(

        `${API_URL}/api/admin/delete-storage-accounts/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storage_account_id: storageaccountId,
          }),
        }
      );

      if (response.ok) {

        setContainerData((prevData) =>
          prevData.filter((container) => container.id !== storageaccountId)
        );
        setSelectedStorageRowForDeletion(null);
      } else {

        console.error("Failed to delete storage container.");
      }
    } catch (error) {
      console.error("Error during delete:", error);

    } finally {

    }
  };

  const handleConfirmDelete = async (fileShareId) => {
    try {
      if (!token) {
        console.error("Token is not available.");

        return;
      }
      if (fileShareId === null) {

        setFileShareData((prevData) =>
          prevData.filter((fileshare) => fileshare.id !== fileShareId)
        );
        setSelectedFileShareForDeletion(null);
        return; 
      }

      const response = await fetch(
        `${API_URL}/api/admin/delete-file-shares/${fileShareId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {

        setFileShareData((prevData) =>
          prevData.filter((fileshare) => fileshare.id !== fileShareId)
        );
        setSelectedFileShareForDeletion(null);
      } else {
        console.error("Failed to delete file share.");
      }
    } catch (error) {
      console.error("Error during delete:", error);
    } finally {
      setSelectedFileShareForDeletion(null);
    }
  };

  const toggleFileSizeUnitDropdown = () => {
    setIsFileSizeUnitDropdownOpen((prev) => !prev);
  };

  const renderStorageContainer = () => {

    return (
      <div className="flex flex-col space-y-2  items-center">
        <div
          className=" flex flex-row mt-2  px-2 items-center justify-between bg-newgray rounded-lg shadow-xl shadow-slate-500/30"
          style={{
            width: `${(subDataContainerWidth * 0.95).toFixed(2)}px`,
            height: `${(subContainerHeight * 0.11).toFixed(2)}px`,
          }}
        >
          <button
            className={`w-32  h-8 flex flex-row   px-2 rounded-md cursor-pointer justify-center items-center font-normal text-xs bg-purpleshade1 text-white add-field-button
                        ${isNewFieldVisibleStorage ? "blur-effect" : ""} 
                       ${ selectedStorageRowForDeletion ? "blur-effect": ""}
                       ${showChatbot ? "blur-effect" : ""}
                        ${showProfileModal ? "blur-effect" : ""}
                        ${isTimezoneModalOpen ? "blur-effect" : ""}`}
            onClick={() => setisNewFieldVisibleStorage(true)}
            style={{
              height: "2rem",
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "hidden",
            }}
          >
            Add New Field
          </button>
          <button
            className={`w-20  h-8 flex flex-row   px-2 rounded-md cursor-pointer justify-center items-center font-normal text-xs bg-purpleshade1 text-white add-field-button
                        ${isNewFieldVisibleStorage ? "blur-effect" : ""} 
                       ${
                         selectedStorageRowForDeletion
                           ? "blur-effect"
                           : ""
                       }
                       ${showChatbot ? "blur-effect" : ""} ${
              showProfileModal ? "blur-effect" : ""
            } ${isTimezoneModalOpen ? "blur-effect" : ""}`}
            onClick={handleTableSave}
            style={{
              height: "2rem",
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "hidden",
            }}
          >
            Save
          </button>
        </div>
        <div
          className="flex flex-col items-center "
          style={{
            width: `${tableContainerWidth}px`,
            height: `${tableContainerHight}px`,
          }}
        >
          <div
            className={`flex rounded-t-xl bg-blue-500  ${
              isZoomedIn ? "overflow-x-auto " : ""
            }
            ${isNewFieldVisibleStorage ? "blur-effect" : ""} 
        ${selectedStorageRowForDeletion ? "blur-effect" : ""}
        ${showChatbot ? "blur-effect" : ""} ${
              showProfileModal ? "blur-effect" : ""
            } ${isTimezoneModalOpen ? "blur-effect" : "" }`}
            style={{
              width: `${(tableContainerWidth * 0.97).toFixed(2)}px`,
              height: `${(tableContainerHight * 0.1).toFixed(2)}px`,
            }}
          >
            <table className="table-design table-fixed w-full ">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[25%]" />
                <col className="w-[50%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead className="bg-purpleshade1 sticky top-0 z-10 rounded-t-lg">
                <tr>
                  <th className="py-2 sticky top-0 border border-none rounded-tl-lg"></th>
                  <th className="py-2 sticky top-0 border border-l-0 border-r-0 text-sm text-white font-normal">
                    Storage Account Name
                  </th>
                  <th className="py-2 sticky top-0 text-sm text-white font-normal">
                    Storage Account Key
                  </th>
                  <th className="py-2 sticky top-0 text-sm text-white font-normal rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div
            className="flex flex-col adjusted-margin-top rounded-b-xl shadow-md shadow-slate-500/30 bg-white"
            style={{
              width: `${(tableContainerWidth * 0.97).toFixed(2)}px`,
              height: `${(tableContainerHight * 0.8).toFixed(2)}px`,
            }}
          >
            <div
              className={`py-1 overflow-auto  ${
                isZoomedIn ? "overflow-x-auto " : ""
              }
            ${isNewFieldVisibleStorage ? "blur-effect" : ""} 
        ${selectedStorageRowForDeletion ? "blur-effect" : ""}
        ${showChatbot ? "blur-effect" : ""} ${
                showProfileModal ? "blur-effect" : ""
              }`}
              style={{
                width: `${(tableContainerWidth * 0.97).toFixed(2)}px`,
                height: `${(tableContainerHight * 0.75).toFixed(2)}px`,
                scrollbarWidth: "thin",
              }}
            >
              <table className="table-design table-fixed w-full">
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="w-full h-full flex flex-col justify-center items-center space-y-6 mt-20"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/loadergif.gif`}
                          alt="Loading..."
                          className="animate-spin w-8 h-8"
                        />
                        <p className="text-logintext font-[350] text-[13px] animate-pulse">
                          Just a moment...
                        </p>
                      </td>
                    </tr>
                  ) : (
                    containerData &&
                    containerData.map((container, index) => (
                      <tr
                        className="mt-1"
                        key={container.id}
                        onClick={() => handleRowClick(container)}
                        style={{ cursor: "pointer" }}

                      >
                        <td className="w-[5%] text-[11px] font-light overflow-ellipsis whitespace-nowrap overflow-hidden">
                          <input

                            type="checkbox"
                            onChange={() => handleCheckboxChange(container)}

                            checked={container.is_download_storage}
                            className="ml-2"
                          />
                        </td>
                        <td className="w-[25%] text-[11px] font-light overflow-ellipsis whitespace-nowrap overflow-hidden">
                          <input
                            type="text"
                            value={container.account_name}

                            readOnly
                          />
                        </td>
                        {}
                        <td className="w-[50%]  text-[11px] font-light overflow-ellipsis whitespace-nowrap overflow-hidden ">
                          {showAccountKey ? (
                            <React.Fragment>
                              <input
                                className="w-[85%] pr-3 outline-none border-none h-6 cursor-pointer text-lightgray-100"
                                type="text"
                                value={
                                  container.showActualKey &&
                                  container.account_key
                                    ? container.account_key
                                    : "*".repeat(
                                        container.account_key
                                          ? container.account_key.length
                                          : 0
                                      )
                                }
                                onChange={(e) =>
                                  handleContainerDataChange(
                                    index,
                                    "account_key",
                                    e.target.value
                                  )
                                }
                              />
                              <button
                                className=" text-xs font-light  border-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAccountKeyVisibility(index);
                                }}
                              >
                                {}
                                {container.showActualKey ? (
                                  <FontAwesomeIcon icon={faEyeSlash} />
                                ) : (
                                  <FontAwesomeIcon icon={faEye} />
                                )}
                              </button>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <input
                                className="w-[85%] pr-3 outline-none border-none h-6 cursor-pointer text-lightgray-100"
                                type="text"
                                value={container.account_key || ""}
                                onChange={(e) =>
                                  handleContainerDataChange(
                                    index,
                                    "account_key",
                                    e.target.value
                                  )
                                }
                              />
                              <button
                                className="text-xs font-light border-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAccountKeyVisibility(index);
                                }}
                              >
                                <FontAwesomeIcon icon={faEyeSlash} />
                              </button>
                            </React.Fragment>
                          )}
                        </td>
                        {}

                        <td className="w-[20%] text-xs font-light overflow-ellipsis whitespace-nowrap overflow-hidden">
                          <div className="flex flex-row space-x-3">
                            <button
                              className="text-xs font-light border-none  w-14 items-center justify-center
                                      rounded-md flex h-6 space-x-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRefresh(container);
                              }}
                            >
                              <img src="sync-icon.png" alt="sync" />
                            </button>
                            <button
                              className="w-[20px] "
                              onClick={(e) => {
                                e.stopPropagation(); 
                                setSelectedStorageRowForDeletion(container);
                              }}
                            >
                              <img
                                src="icon-delete.png"
                                alt="delete"
                                className="w-4 h-4 rounded-lg"
                              />

                              {}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {isNewFieldVisibleStorage && (
            <NewFieldPopup
              newFieldName={newFieldName}
              setNewFieldName={setNewFieldName}
              setNewAccountKey={setNewAccountKey}
              newAccountKey={newAccountKey}
              handleAccountNameChange={handleAccountNameChange}
              handleAccountKeyChange={handleAccountKeyChange}
              onCancel={() => {
                setisNewFieldVisibleStorage(false);
                setNewFieldName('');
                setNewAccountKey('');
              }}
              handleStorageAccountSave={handleStorageAccountSave}
            />
          )}

          {selectedStorageRowForDeletion && (
            <div className="absolute inset-0 flex justify-center z-20 items-center">
              <UserDeleteConfirmationPopup
                context={selectedStorageRowForDeletion}
                onCancel={handleCancelDelete}
                onConfirm={() =>
                  handleConfirmStorageDelete(selectedStorageRowForDeletion.id)
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFileShare = () => {

    return (
      <div className="flex flex-col items-center space-y-2">
        <div
          className={` flex flex-row mt-2 r items-center justify-between px-2 bg-newgray rounded-lg shadow-md shadow-slate-500/30
     ${selectedFileShareForDeletion ? "blur-effect" : ""}
            ${isNewFieldVisibleFileShare ? "blur-effect" : ""}
            ${showChatbot ? "blur-effect" : ""} 
            ${showProfileModal ? "blur-effect" : ""}
            ${isTimezoneModalOpen ? "blur-effect" : ""}`}
          style={{
            width: `${(subDataContainerWidth * 0.95).toFixed(2)}px`,
            height: `${(subContainerHeight * 0.11).toFixed(2)}px`,
          }}
        >
          <button
            className={` h-8 flex flex-row  px-1 rounded-md cursor-pointer justify-center items-center font-normal text-xs bg-purpleshade1 text-white add-field-button
              `}
            onClick={() => {
              setisNewFieldVisibleFileShare(true);

            }}
            style={{
              height: "2rem",
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "hidden",
            }}
          >
            Add New Field
          </button>
          <button
            className={`w-20  h-8 flex flex-row   px-2 rounded-md cursor-pointer justify-center items-center font-normal text-xs bg-purpleshade1 text-white add-field-button`}
            onClick={() => {
              handleFileShareSaveButtonClick()
            }}
            style={{
              height: "2rem",
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "hidden",
            }}
          >
            Save
          </button>
        </div>
        <div
          className={`flex flex-col items-center  `}
          style={{
            width: `${tableContainerWidth}px`,
            height: `${tableContainerHight}px`,
          }}
        >
          <div
            className={`flex rounded-t-xl  ${
              selectedFileShareForDeletion ? "blur-effect" : ""
            }

            ${isTimezoneModalOpen ? "blur-effect" : ""}
        ${showChatbot ? "blur-effect" : ""} ${
              showProfileModal ? "blur-effect" : ""
            } ${isNewFieldVisibleFileShare ? "blur-effect" : ""}`}
            style={{
              width: `${(tableContainerWidth * 0.97).toFixed(2)}px`,
              height: `${(tableContainerHight * 0.1).toFixed(2)}px`,
            }}
          >
            <table className="table-design table-fixed w-full">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[25%]" />
                <col className="w-[50%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead className="bg-purpleshade1 sticky top-0 z-10 rounded-t-lg">
                <tr>
                  <th className="py-2 sticky top-0 border border-none rounded-tl-lg"></th>
                  <th className="py-2 sticky top-0 border border-l-0 border-r-0 text-sm text-white font-normal">
                    File Share Name
                  </th>
                  <th className="py-2 sticky top-0 text-sm text-white font-normal">
                    File Share Path
                  </th>
                  <th className="py-2 sticky top-0 text-sm text-white font-normal rounded-tr-lg ">
                    Action
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div
            className={`flex flex-col adjusted-margin-top rounded-b-xl shadow-md shadow-slate-500/30 bg-white`}
            style={{
              width: `${(tableContainerWidth * 0.97).toFixed(2)}px`,
              height: `${(tableContainerHight * 0.8).toFixed(2)}px`,
            }}
          >
            <div
              className={`py-1  overflow-auto  ${
                isNewFieldVisibleFileShare ? "blur-effect" : ""
              }
        ${selectedFileShareForDeletion ? "blur-effect" : ""}
        ${showChatbot ? "blur-effect" : ""} ${
                showProfileModal ? "blur-effect" : ""
              }`}
              style={{
                width: `${(tableContainerWidth * 0.97).toFixed(2)}px`,
                height: `${(tableContainerHight * 0.75).toFixed(2)}px`,
                scrollbarWidth: "thin",
              }}
            >
              <table className="table-design table-fixed w-full">
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="w-full h-full flex flex-col justify-center items-center space-y-6 mt-20"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/loadergif.gif`}
                          alt="Loading..."
                          className="animate-spin w-8 h-8"
                        />
                        <p className="text-logintext font-[350] text-[13px] animate-pulse">
                          Just a moment...
                        </p>
                      </td>
                    </tr>
                  ) : (
                    fileShareData &&
                    fileShareData.map((fileshare, index) => (
                      <tr
                        key={fileshare.id}
                        onClick={() => handleFileShareRowClick(fileshare)}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="w-[5%] text-[11px] font-light overflow-ellipsis whitespace-nowrap overflow-hidden"></td>
                        <td className="w-[25%] text-[11px] font-light  overflow-ellipsis whitespace-nowrap overflow-hidden">
                          <input
                            className="w-full mr-[12px] "
                            type="text"
                            value={fileshare.name}

                            readOnly
                          />
                        </td>
                        <td className="w-[50%] text-[11px] font-light  overflow-ellipsis whitespace-nowrap overflow-hidden ">
                          {showAccountKey ? (
                            <React.Fragment>
                              <input
                                className="w-[85%] pr-3 outline-none border-none h-6 cursor-pointer text-lightgray-100"
                                type="text"
                                value={
                                  fileshare.showActualKey && fileshare.filepath
                                    ? fileshare.filepath
                                    : "*".repeat(
                                        fileshare.filepath
                                          ? fileshare.filepath.length
                                          : 0
                                      )
                                }
                                onChange={(e) =>
                                  handleFileShareDataChange(
                                    index,
                                    "filepath",
                                    e.target.value
                                  )
                                }
                              />
                              <button
                                className=" text-[13px] font-light  border-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFilePathVisibility(index);
                                }}
                              >
                                {fileshare.showActualKey ? (
                                  <FontAwesomeIcon icon={faEyeSlash} />
                                ) : (
                                  <FontAwesomeIcon icon={faEye} />
                                )}
                              </button>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <input
                                className="w-[85%] pr-3 outline-none border-none h-6 cursor-pointer text-lightgray-100"
                                type="text"
                                value={fileshare.filepath || ""}
                                onChange={(e) =>
                                  handleFileShareDataChange(
                                    index,
                                    "filepath",
                                    e.target.value
                                  )
                                }
                              />
                              <button
                                className=" text-xs font-light  border-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFilePathVisibility(index);
                                }}
                              >
                                <FontAwesomeIcon icon={faEyeSlash} />
                              </button>
                            </React.Fragment>
                          )}
                        </td>
                        <td className="w-[20%] text-xs font-light  overflow-ellipsis whitespace-nowrap overflow-hidden">
                          <div className="flex flex-row space-x-3">
                            <button
                              className="text-xs font-light border-none  w-14 items-center justify-center
                                      rounded-md flex h-6 space-x-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFileShareRefresh(fileshare);
                              }}

                            >
                              <img
                                src="sync-icon.png"
                                alt="sync"

                              />
                            </button>
                            <button
                              className="w-[20px]"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFileShareForDeletion(fileshare);

                              }}
                            >
                              <img
                                src="icon-delete.png"
                                alt="delete"
                                className="w-4 h-4 rounded-lg"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {selectedFileShareForDeletion && (
            <div className="absolute inset-0 flex justify-center z-20 items-center">
              <DeleteConfirmationPopup
                fileShare={selectedFileShareForDeletion}
                onCancel={handleCancelDelete}
                onConfirm={() =>
                  handleConfirmDelete(selectedFileShareForDeletion.id)
                }
              />
            </div>
          )}

          {isNewFieldVisibleFileShare && (
            <div className="absolute inset-0 flex justify-center z-20 items-center">
              <NewFileShareModal
                newFieldName={newFieldName}
                newFilePatth={newFilePath}
                handleAccountNameChange={handleAccountNameChange}
                handleFilePathChange={handleFilePathChange}

                onCancel={closePreviewModal}
                handleFileShareSaveButtonClick={handleFileShareSaveButtonClick}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMiscellaneous = () => {
    return (
      <div
        className={`w-full h-full flex flex-col pl-12 bg-white rounded-lg shadow-top  ${
          isTimezoneModalOpen ? "blur-effect" : ""
        }  `}
      >
        <div className="w-[98%] h-8 flex justify-end mt-3"></div>
        <div className="w-full h-[90%] flex flex-row space-x-44 mt-8  ">
          <div className="flex flex-col space-y-5 ">
            <h2>Download File Size Allowed</h2>
            <div className="flex flex-row justify-between mt-8 p-1 w-40 h-7  rounded border  border-black ">
              <input
                type="text"
                placeholder="Enter download file size"
                className="outline-none ml-0 font-[350] text-[13px] "
                value={downloadFileSize}
                onChange={handleDownloadFileSizeChange}
              />
            </div>

            <div className="relative inline-block mt-6">
              <button
                id="fileSizeUnitDropdownButton"
                onClick={toggleFileSizeUnitDropdown}
                className="text-black w-40 border border-lightgray-100 bg-white font-normal rounded text-sm px-2 py-1.5 text-center inline-flex items-center"
                type="button"
              >
                <span className="truncate">{fileSizeUnit}</span>
                <svg
                  className={`w-3 h-3 ml-1 ${
                    isFileSizeUnitDropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                  style={{ marginLeft: "auto" }} 
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {}
              <div
                className={`absolute z-10 ${
                  isFileSizeUnitDropdownOpen ? "" : "hidden"
                } bg-background-100 border border-lightgray-100 divide-y divide-secondary rounded shadow w-40 dark:bg-primary mt-1`}
              >
                <ul
                  className="py-1 text-sm text-black dark:text-gray-200"
                  aria-labelledby="fileSizeUnitDropdownButton"
                >
                  <li>
                    <button
                      type="button"
                      onClick={() => handleFileSizeUnitChange("Bytes")}
                      className="block px-2 py-1 text-start w-full hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Bytes
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleFileSizeUnitChange("kilobytes")}
                      className="block px-2 py-1 text-start w-full hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Kilobytes
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleFileSizeUnitChange("megabytes")}
                      className="block px-2 py-1 text-start w-full hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Megabytes
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-5">
            <h2 className="">Select Time Zone</h2>
            <div className="relative inline-block mt-6">
              <button
                id="timezoneDropdownButton"

                className="text-black bg-white border border-lightgray-100 w-40
                     font-normal rounded text-sm px-3 py-1.5 text-center inline-flex items-center"
                type="button"
              >
                {selectedTimeZone.label}{" "}
                <svg
                  className={`w-3 h-3 ml-1 ${
                    isFileSizeUnitDropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                  style={{ marginLeft: "auto" }} 
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div className="relative inline-block">
                <TimezoneModal
                  isTimezoneModalOpen={isTimezoneModalOpen}
                  setIsTimezoneModalOpen={setIsTimezoneModalOpen}
                  closePreviewModal={handleCloseChatbot}
                  setSelectedNavbarOption={setSelectedNavbarOption}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const IsMaskedSwitch = React.memo(({ isMasked, onToggle }) => {
    const toggleIsMasked = React.useCallback(() => {
      onToggle(!isMasked);
    }, [isMasked, onToggle]);

    return (
      <div className="flex flex-row items-center space-x-2">
        <img
          src={
            isMasked
              ? process.env.PUBLIC_URL + "/yesswitch-icon.png"
              : process.env.PUBLIC_URL + "/noswitch-icon.png"
          }
          alt={isMasked ? "Yes" : "No"}
          onClick={toggleIsMasked}
          style={{ width: "30px", height: "20px", cursor: "pointer" }}
        />
      </div>
    );
  });

  const renderGlobalComun = () => {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div
          className={`flex flex-col mt-2 px-2 pt-2 bg-newgray overflow-y-auto rounded-lg shadow-xl shadow-slate-500/30 space-y-2
            ${showUploadPopup ? "blur-[5px]" : "blur-none"}
            ${showDownloadPopup ? "blur-effect" : ""}
            ${isNewFieldVisible ? "blur-effect" : ""}
            ${showChatbot ? "blur-effect" : ""}
             ${isTimezoneModalOpen ? "blur-effect" : ""} ${
            showProfileModal ? "blur-effect" : ""}`}
          style={{
            width: `${(subDataContainerWidth * 0.95).toFixed(2)}px`,
            height: `${(subContainerHeight * 0.2).toFixed(2)}px`,
            scrollbarWidth: "thin",
          }}
        >
          <div className=" flex items-center" style={{
            width: `${((subDataContainerWidth * 0.95) * 0.95).toFixed(2)}px`,
            height: `${((subContainerHeight * 0.2) * 0.8).toFixed(2)}px`,
            scrollbarWidth: "thin",
          }}>
                <div className="flex  items-center ml-2 px-1 bg-white rounded-md shadow-md shadow-slate-500/30 search-field">
            <input
              type="text"
              placeholder="Search here"
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGlobalSearchClick(); 
                }
              }}
              className="outline-none ml-2 font-light text-xs flex-grow search-field"
              value={inputValue}
              style={{
                height: "2rem",
                maxWidth: "100%",
                maxHeight: "90%",
                overflow: "hidden",
              }}

            />
             <div className="flex flex-row space-x-2">
              <button
          className="bg-background-100 text-2xl font-semibold "
          onClick={() => {
            setInputValue(""); 
    fetchDownloadConfigData(""); 

          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/closefile.png"}
            alt="close"
            className="h-4 w-6"
          />
        </button>
              <img
                src="search_icon.png"
                alt="search"
                style={{ width: "17px", height: "17px" }}
                onClick={handleGlobalSearchClick} 
              />
              </div>
            {}
          </div>
          </div>
          <div className=" flex items-center" style={{
            width: `${((subDataContainerWidth * 0.95) * 0.95).toFixed(2)}px`,
            height: `${((subContainerHeight * 0.2) * 0.8).toFixed(2)}px`,

          }}>
             <div className="w-full flex flex-row space-x-4 px-3 ">
            <button
              className="w-32  h-8 flex flex-row   px-4 rounded-md cursor-pointer 
                          items-center justify-center font-normal text-xs bg-purpleshade1
                          text-white add-field-button"
              onClick={() => {
                setisNewFieldVisible(true);
                handleAddNewField();
              }}
              style={{
                height: "2rem",
                maxWidth: "100%",
                maxHeight: "90%",
                overflow: "hidden",
              }}
            >
              Add New Field
            </button>
            <button
              className="w-28  h-8 flex flex-row  ml-4 px-4 rounded-md cursor-pointer
                           justify-center items-center font-normal text-xs bg-purpleshade1
                          text-white add-field-button"
              onClick={handleUploadButtonClick}

              style={{
                height: "2rem",
                maxWidth: "100%",
                maxHeight: "90%",
                overflow: "hidden",
              }}
            >
              Upload
            </button>
            <button
              className="w-28  h-8 flex flex-row  ml-4 px-4 rounded-md cursor-pointer
                           justify-center items-center font-normal text-xs bg-purpleshade1
                          text-white  add-field-button"
              onClick={handleDownloadButtonClick}

              style={{
                height: "2rem",
                maxWidth: "100%",
                maxHeight: "90%",
                overflow: "hidden",
              }}
            >
              Download
            </button>

            <div className="flex-grow"></div>
            <button
              className="w-28  h-8 flex flex-row  ml-4 px-4 rounded-md cursor-pointer
                           justify-center items-center font-normal text-xs bg-purpleshade1
                          text-white add-field-button "
              onClick={handleDownloadSaveButtonClick}

              style={{
                height: "2rem",
                maxWidth: "100%",
                maxHeight: "90%",
                overflow: "hidden",
              }}
            >
              Save
            </button>
          </div>

          </div>

        </div>
        <div
          className="flex flex-col items-center"
          style={{
            width: `${tableContainerWidth}px`,
            height: `${globaltableContainerHight}px`,
          }}
        >
          <div
            className={`flex rounded-t-xl bg-blue-500 ${
              showUploadPopup ? "blur-[5px]" : "blur-none"
            }
            ${showDownloadPopup ? "blur-effect" : ""}
            ${isNewFieldVisible ? "blur-effect" : ""}
            ${showChatbot ? "blur-effect" : ""} ${
              showProfileModal ? "blur-effect" : ""
            }
             ${isTimezoneModalOpen ? "blur-effect" : ""}`}
            style={{
              width: `${(tableContainerWidth * 0.97).toFixed(2)}px`,
              height: `${(globaltableContainerHight * 0.1).toFixed(2)}px`,
            }}
          >
            <table className="table-design table-fixed w-full">
              <colgroup>
                <col className="w-[75%]" />
                <col className="w-[25%]" />
              </colgroup>
              <thead className="bg-purpleshade1 sticky top-0 rounded-tr-lg rounded-tl-lg text-white ">
                <tr>
                  <th className="py-2 sticky top-0 px-16 rounded-tl-lg font-normal text-xs ">
                    Field Name
                  </th>
                  <th className="py-2 sticky top-0 rounded-tr-lg font-normal text-xs">
                    Is Masked
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div
            className="flex flex-col adjusted-margin-top rounded-b-xl shadow-md shadow-slate-500/30 bg-white"
            style={{
              width: `${(tableContainerWidth * 0.97).toFixed(2)}px`,
              height: `${(globaltableContainerHight * 0.8).toFixed(2)}px`,
            }}
          >
            <div
              className={`py-1  overflow-auto ${
                showUploadPopup ? "blur-[5px]" : "blur-none"
              }
               ${isTimezoneModalOpen ? "blur-effect" : ""}
            ${showDownloadPopup ? "blur-effect" : ""}
            ${isNewFieldVisible ? "blur-effect" : ""}
            ${showChatbot ? "blur-effect" : ""} ${
                showProfileModal ? "blur-effect" : ""
              }`}
              style={{
                width: `${(tableContainerWidth * 0.97).toFixed(2)}px`,
                height: `${(globaltableContainerHight * 0.75).toFixed(2)}px`,
                scrollbarWidth: "thin",
              }}
            >
              <table
                className="table-design table-fixed w-full"
                style={{

                  scrollbarWidth: "thin",
                }}
              >
                <tbody className="px-6">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="w-full h-full flex flex-col justify-center items-center space-y-6 mt-20"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/loadergif.gif`}
                          alt="Loading..."
                          className="animate-spin w-8 h-8"
                        />
                        <p className="text-logintext font-[350] text-[13px] animate-pulse">
                          Just a moment...
                        </p>
                      </td>
                    </tr>
                  ) : (
                    downloadConfigApiData &&
                    downloadConfigApiData.map((config, index) => (
                      <tr key={index}>
                        <td className="w-[75%] font-light text-xs px-16 overflow-ellipsis whitespace-nowrap overflow-hidden">
                          <input
                            id={`config-input-${index}`}
                            type="text"
                            value={config.name}
                            onChange={(e) =>
                              handleDownloadConfigFieldChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="w-[25%] font-light text-xs px-3 overflow-ellipsis whitespace-nowrap overflow-hidden">
                          <div className="flex flex-row space-x-6 px-4">
                            <IsMaskedSwitch
                              isMasked={config.is_masked.toString() === "true"}
                              onToggle={(isChecked) =>
                                handleDownloadConfigFieldChange(
                                  index,
                                  "is_masked",
                                  isChecked ? "true" : "false"
                                )
                              }
                            />
                            {config.showDeleteButton && (
                              <button
                                className="bg-background-100 text-2xl font-semibold mr-4"
                                onClick={() =>
                                  handleDeleteField(
                                    config.field_id,
                                    config.name
                                  )
                                }
                              >
                                &times;
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {showUploadPopup && (
              <div
                className={`absolute left-0 w-full h-full flex justify-center items-center z-50 
         ${showUploadPopup ? "blur-none" : ""}`}
              >
                <UploadPopup />
              </div>
            )}
            <ErrorPopup
              isOpen={isPopupOpen}
              message={error}

              onClose={handleClosePopup}
            />
            {}
            {showDownloadPopup && (
              <div className="absolute inset-0 flex justify-center z-20 items-center">
                <DownloadPopup
                  onClose={handlePopupClose}
                  onSelect={handleDownloadOptionSelect}
                  popupRef={popupRef}
                />
              </div>
            )}
            {isNewFieldVisible && (
              <div className="absolute inset-0 flex justify-center z-20 items-center">
                <NewGlobalField
                  onCancel={closePreviewModal}

                  newFieldName={newFieldName || ''}
                  setNewFieldName={setNewFieldName}
                  newFieldIsMasked={newFieldIsMasked}
                  setNewFieldIsMasked={setNewFieldIsMasked}
                  IsMaskedSwitch={IsMaskedSwitch}

                  handleDownloadSaveButtonClick={handleDownloadSaveButtonClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false); 
    setIsTimezoneModalOpen(false);
    setSelectedNavbarOption(null);
    setShowProfileModal(false);
  };

  const handleChatbotIconClick = () => {
    setShowChatbot(!showChatbot); 
  };

  const handleOptionSelect = (option) => {
    setSelectedNavbarOption(option);

    if (option === "Profile") {
      setShowProfileModal(true);
      setIsTimezoneModalOpen(false); 
    } else if (option === "Select Time Zone") {
      setIsTimezoneModalOpen(true);
      setShowProfileModal(false); 
    }
  };

  useEffect(() => {

  }, []);
  const { width, height } = getViewportDimensions();
  const navWidth = (width * 0.98).toFixed(2); 
  const navHeight = (height * 0.09).toFixed(2); 
  const navMarginTop = (height * 0.02).toFixed(2); 
  const containerWidth = (width * 0.91).toFixed(2); 
  const containerHeight = (height * 0.85).toFixed(2); 
  const containerMTop = (height * 0.13).toFixed(2); 
  const cMarginTop = `${(
    containerMTop -
    (parseFloat(navHeight) + parseFloat(navMarginTop))
  ).toFixed(2)}`;
  const PContainerHeight = `${(
    height -
    (parseFloat(navHeight) + parseFloat(navMarginTop))
  ).toFixed(2)}`;
  const sidebarWidth = `${(width * 0.06).toFixed(2)}`;
  const sidebarHeight = `${(height * 0.98).toFixed}`;
  const sidebarLMargin = `${(width * 0.01).toFixed(2)}`;
  const containerMarginLeft = `${(width * 0.08).toFixed(2)}`;
  const cMarginLeft = `${(
    containerMarginLeft -
    (parseFloat(sidebarWidth) + parseFloat(sidebarLMargin))
  ).toFixed(2)}px`;
  const subContainerWidth = `${(containerWidth * 0.95).toFixed(2)}`;
  const subContainerHeight = `${(containerHeight * 0.8).toFixed(2)}`;
  const subContainerTMargin = `${(
    containerHeight * 0.1 -
    parseFloat(cMarginTop)
  ).toFixed(2)}`;
  const listItemsContainerWidth = `${(subContainerWidth * 0.2).toFixed(2)}`;
  const listItemsContainerHeight = `${(containerHeight * 0.8).toFixed(2)}`;
  const dataContainerWidth = `${subContainerWidth - listItemsContainerWidth}`;
  const subDataContainerWidth = `${(dataContainerWidth * 0.99).toFixed(2)}`;
  const subDataContainerHeight = `${(listItemsContainerHeight * 0.98).toFixed(
    2
  )}`;
  const tableContainerWidth = `${(subDataContainerWidth * 0.98).toFixed(2)}`;
  const tableContainerHight = `${(subContainerHeight * 0.84).toFixed(2)}`;
  const globaltableContainerHight = `${(subContainerHeight * 0.74).toFixed(2)}`;

  return (
    <div
      className="bg-primary"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div
        className="flex flex-col items-center "
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className={` ${
      (showUploadPopup || 
       isModalOpen ||  
       isEditUserModalOpen ||
       showDownloadPopup ||
       isNewFieldVisible ||
       isNewFieldVisibleFileShare||
       showChatbot ||
       isTimezoneModalOpen ||
       showProfileModal) 
        ? "pointer-events-none" 
        : ""
    }`}
          style={{
            width: `${navWidth}px`,
            height: `${navHeight}px`,
            marginTop: `${navMarginTop}px`,
          }}
        >
          <Navbar
            onOptionSelect={handleOptionSelect}
            selectedOption={selectedNavbarOption}
          />
        </div>
        <div
          className="flex flex-row"
          style={{ width: `${width}px`, height: `${PContainerHeight}px` }}
        >
          <div
            className={`${
              (showUploadPopup || 
               isModalOpen ||  
               isEditUserModalOpen ||
               showDownloadPopup ||
               isNewFieldVisible ||
               showChatbot ||
               isTimezoneModalOpen ||
               showProfileModal) 
                ? "pointer-events-none" 
                : ""
            }`}
            style={{
              width: `${sidebarWidth}px`,
              height: `${containerHeight}px`,
              marginTop: `${cMarginTop}px`,
              marginLeft: `${sidebarLMargin}px`,
            }}
          >
            <Sidebar />
          </div>
          <div
            className="flex flex-col bg-newgray  rounded-lg items-center  shadow-md shadow-slate-500/30 "
            style={{
              width: `${containerWidth}px`,
              height: `${containerHeight}px`,
              marginTop: `${cMarginTop}px`,
              marginLeft: cMarginLeft,
            }}
          >
            <div
              className={`flex flex-row text-purpleshade1  items-center text-sm font-medium ml-10
                ${
                  (showUploadPopup || 
                   isModalOpen ||  
                   isEditUserModalOpen ||
                   showDownloadPopup ||
                   isNewFieldVisible ||
                   showChatbot ||
                   isTimezoneModalOpen ||
                   showProfileModal) 
                    ? "pointer-events-none" 
                    : ""
                }`}
              style={{
                width: `${(containerWidth * 0.98).toFixed(2)}px`,
                height: `${(containerHeight * 0.07).toFixed(2)}px`,
                marginTop: `${cMarginTop}px`,
              }}
            >
              {}
              <Link to="/home">Home</Link> &gt; Admin Panel
            </div>
            <div
              className="flex flex-row "
              style={{
                width: `${subContainerWidth}px`,
                height: `${subContainerHeight}px`,
              }}
            >
              <div
                className={`flex flex-col  items-center justify-center shadow-md shadow-slate-500/30 rounded-l-lg
                  ${
                    (showUploadPopup || 
                     isModalOpen ||  
                     isEditUserModalOpen ||
                     showDownloadPopup ||
                     isNewFieldVisible ||
                     showChatbot ||
                     isTimezoneModalOpen ||
                     showProfileModal) 
                      ? "pointer-events-none" 
                      : ""
                  }`}
                style={{
                  width: `${listItemsContainerWidth}px`,
                  height: `${listItemsContainerHeight}px`,
                }}
              >
                <div
                  className="flex flex-col  overflow-y-auto space-y-1"
                  style={{
                    width: `${(listItemsContainerWidth * 0.97).toFixed(2)}px`,
                    height: `${(listItemsContainerHeight * 0.97).toFixed(2)}px`,
                    scrollbarWidth: "thin",
                  }}
                >
                  <div
                    className="text-xs font-medium text-black ml-2 px-4 py-4 cursor-pointer flex flex-row h-8 items-center"
                    style={{
                      backgroundColor:
                        selectedOption === "User Group" ? "white" : "",
                        boxShadow: selectedOption === "User Group" ? "0px 2px 10px rgba(0, 0, 0, 0.3)" : "none", 
                      borderRadius:
                        selectedOption === "User Group" ? "5px" : "5px",
                      padding: selectedOption === "User Group" ? "5px" : "5px",
                    }}
                    onClick={() => handleOptionClick("User Group")}
                  >
                    <img
                      src={
                        selectedOption === "User Group"
                          ? process.env.PUBLIC_URL +
                            "/purple-usergroup-icon.png"
                          : process.env.PUBLIC_URL + "/grayuser-group.png"
                      }
                      alt="Icon"

                      className={`mr-3 ${
                        selectedOption === "User Group" ? "w-4 h-3.5" : "w-4 h-3.5"
                      }`}
                    />
                    User Group
                  </div>
                  <div
                    className="text-xs font-medium text-black ml-2 px-4 py-4 cursor-pointer flex flex-row h-8 items-center"
                    style={{
                      backgroundColor:
                        selectedOption === "Storage Container" ? "white" : "",
                        boxShadow: selectedOption === "Storage Container"? "0px 2px 10px rgba(0, 0, 0, 0.3)" : "none", 
                      borderRadius:
                        selectedOption === "Storage Container" ? "5px" : "5px",
                      padding:
                        selectedOption === "Storage Container" ? "5px" : "5px",
                    }}
                    onClick={() => handleOptionClick("Storage Container")}
                  >
                    <img
                      src={
                        selectedOption === "Storage Container"
                          ? process.env.PUBLIC_URL + "/purple-storage.png"
                          : process.env.PUBLIC_URL + "/graystorage-icon.png"
                      }
                      alt="Icon"
                      className={`mr-3 ${
                        selectedOption === "Storage Container"
                          ? "w-4 h-4"
                          : "w-4 h-4"
                      }`}
                    />
                    <div className="flex-1">Storage Container</div>
                    {}
                  </div>
                  <div
                    className="text-xs font-medium text-black ml-1.5 px-4 py-4 cursor-pointer flex flex-row h-8 items-center"
                    style={{
                      backgroundColor:
                        selectedOption === "File Share" ? "white" : "",
                        boxShadow: selectedOption === "File Share"? "0px 2px 10px rgba(0, 0, 0, 0.3)" : "none",
                      borderRadius:
                        selectedOption === "File Share" ? "5px" : "5px",
                      padding: selectedOption === "File Share" ? "5px" : "5px",
                    }}
                    onClick={() => handleOptionClick("File Share")}
                  >
                    <img
                      src={
                        selectedOption === "File Share"
                          ? process.env.PUBLIC_URL +
                            "/purple-fileshare-icon.png"
                          : process.env.PUBLIC_URL + "/grayfile-share.png"
                      }
                      alt="Icon"
                      className={`mr-3 ${
                        selectedOption === "File Share" ? "w-4 h-5 ml-0.5" : "w-4 h-5 ml-0.5 "
                      }`}
                    />
                    <div className="flex-1">FileShare</div>
                    {}
                  </div>

                  <div
                    className={`text-xs font-medium text-black ml-1.5 px-4 py-6  cursor-pointer flex flex-row items-center rounded-lg`}
                    style={{
                      backgroundColor:
                        selectedOption === "Global Column Config"
                          ? "white"
                          : "",
                          boxShadow: selectedOption === "Global Column Config"? "0px 2px 10px rgba(0, 0, 0, 0.3)" : "none",
                      borderRadius:
                        selectedOption === "Global Column Config"
                          ? "5px"
                          : "5px",
                      padding:
                        selectedOption === "Global Column Config"
                          ? "5px"
                          : "5px",
                    }}
                    onClick={() => handleOptionClick("Global Column Config")}
                  >
                    <img
                      src={
                        selectedOption === "Global Column Config"
                          ? process.env.PUBLIC_URL + "/purple-global.png"
                          : process.env.PUBLIC_URL + "/grayglobal-icon.png"
                      }
                      alt="Icon"
                      className="w-[21px] h-[21px] mr-2.5"
                    />
                    <div className="flex-1">Global Column Config</div>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col bg-white justify-center rounded-r-lg shadow-md shadow-slate-500/30 items-center"
                style={{
                  width: `${dataContainerWidth}px`,
                  height: `${listItemsContainerHeight}px`,
                }}
              >
                <div
                  className="flex flex-col items-center "
                  style={{
                    width: `${subDataContainerWidth}px`,
                    height: `${subContainerHeight}px`,
                  }}
                >
                  {selectedOption === "User Group" && (
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={` flex flex-row mt-2  bg-newgray items-center px-2 rounded-lg shadow-md shadow-slate-500/30 add-field-button
                          ${
                            (showUploadPopup || 
                             isModalOpen ||  
                             isEditUserModalOpen ||
                             showChatbot ||
                             isTimezoneModalOpen ||
                             showProfileModal) 
                              ? " blur-effect pointer-events-none" 
                              : ""
                          }`}
                        style={{
                          width: `${(subDataContainerWidth * 0.95).toFixed(
                            2
                          )}px`,
                          height: `${(subContainerHeight * 0.11).toFixed(2)}px`,
                        }}
                      >
                        <button
                          className={` flex flex-row  justify-center text-xs  rounded-md cursor-pointer items-center font-medium  text-white bg-purpleshade1 add-field-button`}
                          onClick={() => {
                            handleUserPermissions();
                            setIsModalOpen(true);
                          }}
                          style={{
                            height: "2rem",
                            maxWidth: "100%",
                            maxHeight: "100%",
                            overflow: "hidden",
                          }}
                        >
                          Add New Field
                        </button>
                      </div>
                      <div
                        className="flex flex-col items-center  "
                        style={{
                          width: `${tableContainerWidth}px`,
                          height: `${tableContainerHight}px`,
                        }}
                      >
                        <div
                          className={`flex rounded-t-xl  ${
                            (showUploadPopup || 
                             isModalOpen ||  
                             isEditUserModalOpen ||
                             showChatbot ||
                             isTimezoneModalOpen ||
                             showProfileModal) 
                              ? "blur-effect pointer-events-none" 
                              : ""
                          } `}
                          style={{
                            width: `${(tableContainerWidth * 0.97).toFixed(
                              2
                            )}px`,
                            height: `${(tableContainerHight * 0.1).toFixed(
                              2
                            )}px`,
                          }}
                        >
                          <table className="table-design table-fixed w-full ">
                            <colgroup>
                              <col className="w-[60%]" />
                              <col className="w-[40%]" />
                            </colgroup>

                            <thead className="bg-purpleshade1 sticky top-0  rounded-t-lg text-white ">
                              <tr>
                                <th className="py-3 sticky top-0 font-medium text-xs border border-none px-16 rounded-tl-lg">
                                  User Group Name
                                </th>
                                <th className="py-3 z-20 sticky px-16 font-medium text-xs top-0 border border-none rounded-tr-lg">
                                  Action
                                </th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                        <div
                          className={`flex flex-col adjusted-margin-top rounded-b-xl shadow-md shadow-slate-500/30 bg-white  ${
                            (showUploadPopup || 
                             isModalOpen ||  
                             isEditUserModalOpen ||  
                             showChatbot ||
                             isTimezoneModalOpen ||
                             showProfileModal) 
                              ? "blur-effect pointer-events-none" 
                              : ""
                          } `}
                          style={{
                            width: `${(tableContainerWidth * 0.97).toFixed(
                              2
                            )}px`,
                            height: `${(tableContainerHight * 0.8).toFixed(
                              2
                            )}px`,
                          }}
                        >
                          <div
                            className="py-1  overflow-auto "
                            style={{
                              width: `${(tableContainerWidth * 0.97).toFixed(
                                2
                              )}px`,
                              height: `${(tableContainerHight * 0.75).toFixed(
                                2
                              )}px`,
                              scrollbarWidth: "thin",
                            }}
                          >
                            <table className="table-design table-fixed w-full">
                              <colgroup>
                                <col className="w-[60%]" />
                                <col className="w-[40%]" />
                              </colgroup>
                              <tbody className=" sticky ">
                                {loading ? (
                                  <tr>
                                    <td
                                      colSpan={2}
                                      className="w-full h-full flex flex-col justify-center items-center"
                                    >
                                      <img
                                        src={`${process.env.PUBLIC_URL}/loadergif.gif`}
                                        alt="Loading..."
                                        className="animate-spin w-6 h-6 mt-32"
                                      />
                                      <p className="text-logintext text-[13px] animate-pulse">
                                        Just a moment...
                                      </p>
                                    </td>
                                  </tr>
                                ) : (
                                  userGroupsData.map((group, index) => (
                                    <tr key={group.id} className="mt-4">
                                      <td className="w-[60%] font-light text-xs px-16 overflow-ellipsis whitespace-nowrap overflow-hidden">
                                        {group.name}
                                      </td>
                                      <td className="w-[40%] font-light  text-xs px-16 overflow-ellipsis whitespace-nowrap overflow-hidden">
                                        <div className="flex flex-row space-x-3">
                                          <button

                                            className=" w-[30px] "
                                            onClick={(e) => {
                                              e.stopPropagation(); 

                                              setIsEditUserModalOpen(true);
                                              handleUserPermissions();

                                              handleClick(group.id);
                                            }}
                                          >
                                            <img
                                              src="icon-edit-row.png"
                                              alt="Edit"
                                              className="w-4 h-4 max-w-full max-h-full rounded-lg"
                                            />
                                            {}
                                          </button>
                                          <button

                                            className="w-[30px] "
                                            onClick={(e) => {
                                              e.stopPropagation(); 

                                              setSelectionUserGroupDeletion(
                                                group
                                              );
                                            }}
                                          >
                                            <img
                                              src="icon-delete.png"
                                              alt="delete"
                                              className="w-4 h-4  rounded-lg"
                                            />

                                            {}
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedOption === "Storage Container" && (
                    <div className={`w-full h-full  `}>
                      {renderStorageContainer()}
                    </div>
                  )}
                  {selectedOption === "File Share" && (
                    <div className="w-full h-full ">{renderFileShare()}</div>
                  )}
                  {selectedOption === "Miscellaneous" && (
                    <div className="w-full h-full ">
                      {renderMiscellaneous()}
                    </div>
                  )}
                  {selectedOption === "Global Column Config" && (
                    <div className="w-full h-full ">{renderGlobalComun()}</div>
                  )}
                  {selectedOption === "User Activity Report" && (
                    <div className="flex flex-col space-y-2">
                      <div
                        className=" flex flex-row rounded-t-xl bg-white rounded-xl shadow-xl shadow-slate-500/30"
                        style={{
                          width: `${(subDataContainerWidth * 0.98).toFixed(
                            2
                          )}px`,
                          height: `${(subContainerHeight * 0.11).toFixed(2)}px`,
                        }}
                      ></div>
                      <div
                        className="flex flex-col items-center bg-orange-600"
                        style={{
                          width: `${tableContainerWidth}px`,
                          height: `${tableContainerHight}px`,
                        }}
                      >
                        <div
                          className="flex rounded-t-xl bg-blue-500"
                          style={{
                            width: `${(tableContainerWidth * 0.95).toFixed(
                              2
                            )}px`,
                            height: `${(tableContainerHight * 0.1).toFixed(
                              2
                            )}px`,
                          }}
                        ></div>
                        <div
                          className="flex flex-col rounded-b-xl shadow-md shadow-slate-500/30 bg-white"
                          style={{
                            width: `${(tableContainerWidth * 0.95).toFixed(
                              2
                            )}px`,
                            height: `${(tableContainerHight * 0.8).toFixed(
                              2
                            )}px`,
                          }}
                        >
                          <div
                            className="py-1 bg-slate-500 overflow-auto"
                            style={{
                              width: `${(tableContainerWidth * 0.95).toFixed(
                                2
                              )}px`,
                              height: `${(tableContainerHight * 0.75).toFixed(
                                2
                              )}px`,
                              scrollbarWidth: "thin",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <AddUserGroupModal
                    isOpen={isModalOpen}
                    closeModal={closePreviewModal}

                    renderAddUserGroup={renderAddUserGroup}
                    showPreview={showPreview}
                  />

                  <EditUserModal
                    isOpen={isEditUserModalOpen}
                    closeModal={closePreviewModal}

                    renderEditUserGroup={renderEditUserGroup}
                    editedUserGroup={editedUserGroup}
                    showPreview={showPreview}
                  />

                  {selectedUserGroupDeletion && (
                    <div className="absolute inset-0 flex justify-center z-20 items-center">
                      <UserDeleteConfirmationPopup
                        context={selectedUserGroupDeletion}
                        onCancel={handleCancelDelete}
                        onConfirm={() =>
                          handleDeleteClick(selectedUserGroupDeletion.id)
                        }
                      />
                    </div>
                  )}

                  <div className="relative inline-block">
                    <TimezoneModal
                      isTimezoneModalOpen={isTimezoneModalOpen}
                      setIsTimezoneModalOpen={setIsTimezoneModalOpen}
                      closePreviewModal={handleCloseChatbot}
                      setSelectedNavbarOption={setSelectedNavbarOption}
                    />
                  </div>
                  <ErrorPopup
                    isOpen={isPopupOpen}
                    message={error}
                    onClose={closePreviewModal}
                  />
                  <div
                    className={`fixed z-[9999] ${
                      (showUploadPopup || 
                       isModalOpen ||  
                       isEditUserModalOpen ||
                       showDownloadPopup ||
                       isNewFieldVisible ||
                      isNewFieldVisibleStorage||
                      isNewFieldVisibleFileShare||
                      isNewFieldVisible||
                       isTimezoneModalOpen ||
                       showProfileModal) 
                        ? "pointer-events-none" 
                        : ""
                    }`}
                    style={{
                      right: "20px",
                      bottom: "30px",
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/chat-icon.png"}
                      alt="Chat Icon"
                      className={`w-12 h-12 cursor-pointer animate-floating `}
                      onClick={handleChatbotIconClick}
                    />
                  </div>

                  {showChatbot && (
                    <Chatbot
                      onClose={handleCloseChatbot}
                      isOpen={showChatbot}
                    />
                  )}
                  {showProfileModal && (
                    <ProfileModal
                      isOpen={showProfileModal}
                      onClose={handleCloseChatbot}
                    />
                  )}
                </div>
              </div>
            </div>
            {selectedOption === "User Activity Report" && (
              <div
                className="flex flex-row bg-green-300"
                style={{
                  width: `${(containerWidth * 0.93).toFixed(2)}px`,
                  height: `${(containerHeight * 0.1).toFixed(2)}px`,
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAdminPanel;