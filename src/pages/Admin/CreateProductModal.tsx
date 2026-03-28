import { useState } from "react";
import styles from "./CreateProductModal.module.css";
import toast from "react-hot-toast";

interface CreateProductModalProps {
  onClose: () => void;
  onSuccess: () => void;
  products: { collection: string }[];
}

export function CreateProductModal({
  onClose,
  onSuccess,
  products,
}: CreateProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isNewCollection, setIsNewCollection] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const uniqueCollections = Array.from(
    new Set(products.map((p) => p.collection)),
  );

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    collection: "",
    isExclusive: false,
    isBundle: false,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image!");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const savedKey = localStorage.getItem("adminKey") || "";

      const uploadData = new FormData();
      uploadData.append("image", imageFile);

      const uploadResponse = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        body: uploadData,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload image");
      const uploadResult = await uploadResponse.json();

      const finalImageUrl = uploadResult.imageUrl;

      const safeTitle = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      const randomNum = Math.floor(Math.random() * 1000);
      let finalId = formData.isBundle
        ? `bundle-${safeTitle}-${randomNum}`
        : `${safeTitle}-${randomNum}`;

      const productPayload = {
        ...formData,
        id: finalId,
        price: Number(formData.price),
        imageUrl: finalImageUrl,
      };

      const productResponse = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": savedKey,
        },
        body: JSON.stringify(productPayload),
      });

      if (!productResponse.ok) throw new Error("Failed to create product");

      toast.success("Product created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Product Image</label>
            <label className={styles.fileUploadArea}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.hiddenFileInput}
                required={!imageFile}
              />

              <div className={styles.fileUploadPlaceholder}>
                {imageFile ? (
                  <span className={styles.fileName}>✓ {imageFile.name}</span>
                ) : (
                  <span>Click or drag to upload an image</span>
                )}
              </div>
            </label>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.imagePreview}
              />
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Collection</label>
            {isNewCollection ? (
              <input
                type="text"
                placeholder="Enter new collection name"
                value={formData.collection}
                onChange={(e) =>
                  setFormData({ ...formData, collection: e.target.value })
                }
                required
              />
            ) : (
              <div className={styles.customSelectWrapper}>
                <div
                  className={styles.customSelectTrigger}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{formData.collection || "Select a collection"}</span>
                  <span className={styles.arrow}>
                    {isDropdownOpen ? "▲" : "▼"}
                  </span>
                </div>

                {isDropdownOpen && (
                  <ul className={styles.customSelectList}>
                    {uniqueCollections.map((colName) => (
                      <li
                        key={colName}
                        className={styles.customSelectOption}
                        onClick={() => {
                          setFormData({ ...formData, collection: colName });
                          setIsDropdownOpen(false);
                        }}
                      >
                        {colName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={isNewCollection}
                onChange={(e) => {
                  setIsNewCollection(e.target.checked);
                  setFormData({ ...formData, collection: "" });
                }}
              />
              Add new collection?
            </label>
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={formData.isExclusive}
                onChange={(e) =>
                  setFormData({ ...formData, isExclusive: e.target.checked })
                }
              />
              Is Exclusive?
            </label>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
            >
              {isLoading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
